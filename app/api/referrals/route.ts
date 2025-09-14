/**
 * API Routes for Referral Tracker
 *
 * Handles CRUD operations for referrals.
 * Protected by feature flag.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { isFeatureEnabled } from '@/lib/feature-flags';

// Generate unique referral code
function generateReferralCode(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `REF-${year}-${random}`;
}

// Check if feature is enabled
if (!isFeatureEnabled('REFERRAL_TRACKER')) {
  export async function GET() {
    return NextResponse.json({ error: 'Feature not enabled' }, { status: 404 });
  }

  export async function POST() {
    return NextResponse.json({ error: 'Feature not enabled' }, { status: 404 });
  }
} else {
  /**
   * GET /api/referrals
   * Fetch referrals with optional filters
   */
  export async function GET(request: NextRequest) {
    try {
      const supabase = await createServerClient();
      const { searchParams } = new URL(request.url);

      const status = searchParams.get('status');
      const referrerType = searchParams.get('referrer_type');
      const limit = parseInt(searchParams.get('limit') || '50');
      const offset = parseInt(searchParams.get('offset') || '0');

      // TODO: Add authentication check for admin users
      // const { data: { user } } = await supabase.auth.getUser();
      // if (!user || user.role !== 'admin') {
      //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      // }

      let query = supabase
        .from('referrals')
        .select('*, referral_status_history(*, created_at), referral_communications(*)')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (status && status !== 'all') {
        query = query.eq('status', status);
      }

      if (referrerType) {
        query = query.eq('referrer_type', referrerType);
      }

      const { data, error } = await query;

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      // Calculate metrics
      const metrics = await calculateReferralMetrics(supabase);

      return NextResponse.json({ data, metrics });
    } catch (error) {
      // Error fetching referrals
      return NextResponse.json(
        { error: 'Failed to fetch referrals' },
        { status: 500 }
      );
    }
  }

  /**
   * POST /api/referrals
   * Create a new referral
   */
  export async function POST(request: NextRequest) {
    try {
      const supabase = await createServerClient();
      const body = await request.json();

      // Generate unique referral code
      const referralCode = generateReferralCode();

      const { data, error } = await supabase
        .from('referrals')
        .insert({
          ...body,
          referral_code: referralCode,
          status: 'pending',
          expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days
        })
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      // Send notification email (if configured)
      // await sendReferralNotification(data);

      return NextResponse.json({ data }, { status: 201 });
    } catch (error) {
      // Error creating referral
      return NextResponse.json(
        { error: 'Failed to create referral' },
        { status: 500 }
      );
    }
  }
}

/**
 * PUT /api/referrals/[id]
 * Update a referral
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isFeatureEnabled('REFERRAL_TRACKER')) {
    return NextResponse.json({ error: 'Feature not enabled' }, { status: 404 });
  }

  try {
    const supabase = await createServerClient();
    const body = await request.json();

    // TODO: Add authentication check for admin users

    const { data, error } = await supabase
      .from('referrals')
      .update(body)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    // Error updating referral
    return NextResponse.json(
      { error: 'Failed to update referral' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/referrals/[id]/status
 * Update referral status
 */
export async function updateStatus(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isFeatureEnabled('REFERRAL_TRACKER')) {
    return NextResponse.json({ error: 'Feature not enabled' }, { status: 404 });
  }

  try {
    const supabase = await createServerClient();
    const { status, notes } = await request.json();

    // TODO: Add authentication check for admin users

    const { data, error } = await supabase
      .from('referrals')
      .update({
        status,
        ...(status === 'contacted' && { contact_date: new Date().toISOString() }),
        ...(status === 'touring' && { tour_date: new Date().toISOString() }),
        ...(status === 'enrolled' && { enrollment_date: new Date().toISOString() }),
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Check if incentive should be issued
    if (status === 'enrolled' && data.incentive_eligible && !data.incentive_issued) {
      await supabase
        .from('referrals')
        .update({
          incentive_issued: true,
          incentive_issued_date: new Date().toISOString(),
        })
        .eq('id', params.id);
    }

    return NextResponse.json({ data });
  } catch (error) {
    // Error updating referral status
    return NextResponse.json(
      { error: 'Failed to update referral status' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/referrals/[id]/communications
 * Add communication log entry
 */
export async function addCommunication(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isFeatureEnabled('REFERRAL_TRACKER')) {
    return NextResponse.json({ error: 'Feature not enabled' }, { status: 404 });
  }

  try {
    const supabase = await createServerClient();
    const body = await request.json();

    const { data, error } = await supabase
      .from('referral_communications')
      .insert({
        referral_id: params.id,
        ...body,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    // Error adding communication
    return NextResponse.json(
      { error: 'Failed to add communication' },
      { status: 500 }
    );
  }
}

/**
 * Calculate referral metrics
 */
async function calculateReferralMetrics(supabase: ReturnType<typeof createServerClient>) {
  try {
    // Get total referrals
    const { count: totalReferrals } = await supabase
      .from('referrals')
      .select('*', { count: 'exact', head: true });

    // Get successful enrollments
    const { count: successfulEnrollments } = await supabase
      .from('referrals')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'enrolled');

    // Get pending referrals
    const { count: pendingReferrals } = await supabase
      .from('referrals')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Get active referrals (contacted or touring)
    const { count: activeReferrals } = await supabase
      .from('referrals')
      .select('*', { count: 'exact', head: true })
      .in('status', ['contacted', 'touring']);

    // Calculate total incentives issued
    const { data: incentiveData } = await supabase
      .from('referrals')
      .select('incentive_amount')
      .eq('incentive_issued', true);

    const totalIncentivesIssued = incentiveData?.reduce(
      (sum: number, r: { incentive_amount?: number }) => sum + (r.incentive_amount || 0),
      0
    ) || 0;

    // Calculate conversion rate
    const conversionRate = totalReferrals > 0
      ? ((successfulEnrollments / totalReferrals) * 100).toFixed(1)
      : 0;

    // Calculate average days to enrollment
    const { data: enrollmentData } = await supabase
      .from('referrals')
      .select('created_at, enrollment_date')
      .eq('status', 'enrolled')
      .not('enrollment_date', 'is', null);

    let averageDaysToEnrollment = 0;
    if (enrollmentData && enrollmentData.length > 0) {
      const totalDays = enrollmentData.reduce((sum: number, r: { created_at: string; enrollment_date: string }) => {
        const created = new Date(r.created_at);
        const enrolled = new Date(r.enrollment_date);
        const days = Math.floor((enrolled.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
        return sum + days;
      }, 0);
      averageDaysToEnrollment = Math.round(totalDays / enrollmentData.length);
    }

    return {
      totalReferrals: totalReferrals || 0,
      successfulEnrollments: successfulEnrollments || 0,
      conversionRate: typeof conversionRate === 'string' ? parseFloat(conversionRate) : conversionRate,
      averageDaysToEnrollment,
      totalIncentivesIssued,
      pendingReferrals: pendingReferrals || 0,
      activeReferrals: activeReferrals || 0,
    };
  } catch (error) {
    // Error calculating metrics
    return {
      totalReferrals: 0,
      successfulEnrollments: 0,
      conversionRate: 0,
      averageDaysToEnrollment: 0,
      totalIncentivesIssued: 0,
      pendingReferrals: 0,
      activeReferrals: 0,
    };
  }
}