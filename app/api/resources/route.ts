/**
 * API Routes for Resource Library
 *
 * Handles CRUD operations for educational resources.
 * Protected by feature flag.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { isFeatureEnabled } from '@/lib/feature-flags';

// Check if feature is enabled
if (!isFeatureEnabled('RESOURCE_LIBRARY')) {
  export async function GET() {
    return NextResponse.json({ error: 'Feature not enabled' }, { status: 404 });
  }

  export async function POST() {
    return NextResponse.json({ error: 'Feature not enabled' }, { status: 404 });
  }
} else {
  /**
   * GET /api/resources
   * Fetch resources with optional filters
   */
  export async function GET(request: NextRequest) {
    try {
      const supabase = await createServerClient();
      const { searchParams } = new URL(request.url);

      const category = searchParams.get('category');
      const type = searchParams.get('type');
      const featured = searchParams.get('featured');
      const limit = parseInt(searchParams.get('limit') || '20');
      const offset = parseInt(searchParams.get('offset') || '0');

      let query = supabase
        .from('resources')
        .select('*, resource_categories(name, slug, icon)')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (category && category !== 'all') {
        query = query.eq('category_id', category);
      }

      if (type) {
        query = query.eq('resource_type', type);
      }

      if (featured === 'true') {
        query = query.eq('is_featured', true);
      }

      const { data, error } = await query;

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      // Track view count (simplified - in production, use proper analytics)
      if (data && data.length > 0) {
        const resourceIds = data.map(r => r.id);
        await supabase
          .from('resource_interactions')
          .insert(
            resourceIds.map(id => ({
              resource_id: id,
              interaction_type: 'view',
              ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
              user_agent: request.headers.get('user-agent'),
            }))
          );
      }

      return NextResponse.json({ data });
    } catch (error) {
      console.error('Error fetching resources:', error);
      return NextResponse.json(
        { error: 'Failed to fetch resources' },
        { status: 500 }
      );
    }
  }

  /**
   * POST /api/resources
   * Create a new resource (admin only)
   */
  export async function POST(request: NextRequest) {
    try {
      const supabase = await createServerClient();
      const body = await request.json();

      // TODO: Add authentication check for admin users
      // const { data: { user } } = await supabase.auth.getUser();
      // if (!user || user.role !== 'admin') {
      //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      // }

      const { data, error } = await supabase
        .from('resources')
        .insert({
          ...body,
          slug: body.title.toLowerCase().replace(/\s+/g, '-'),
          published_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ data }, { status: 201 });
    } catch (error) {
      console.error('Error creating resource:', error);
      return NextResponse.json(
        { error: 'Failed to create resource' },
        { status: 500 }
      );
    }
  }
}

/**
 * PUT /api/resources/[id]
 * Update a resource (admin only)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isFeatureEnabled('RESOURCE_LIBRARY')) {
    return NextResponse.json({ error: 'Feature not enabled' }, { status: 404 });
  }

  try {
    const supabase = await createServerClient();
    const body = await request.json();

    // TODO: Add authentication check for admin users

    const { data, error } = await supabase
      .from('resources')
      .update(body)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error updating resource:', error);
    return NextResponse.json(
      { error: 'Failed to update resource' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/resources/[id]
 * Delete a resource (admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isFeatureEnabled('RESOURCE_LIBRARY')) {
    return NextResponse.json({ error: 'Feature not enabled' }, { status: 404 });
  }

  try {
    const supabase = await createServerClient();

    // TODO: Add authentication check for admin users

    // Soft delete by setting is_active to false
    const { error } = await supabase
      .from('resources')
      .update({ is_active: false })
      .eq('id', params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting resource:', error);
    return NextResponse.json(
      { error: 'Failed to delete resource' },
      { status: 500 }
    );
  }
}