/**
 * 🎉 Enrollment Confirmation Email Template
 * 
 * This template creates an official and exciting confirmation email
 * when a family completes their enrollment process! It's like getting
 * a golden ticket to join our daycare family.
 * 
 * This email includes:
 * - Official enrollment confirmation
 * - Program and classroom details
 * - Payment and tuition information
 * - Important next steps
 * - Welcome materials and resources
 */

import {
  Html,
  Head,
  Font,
  Preview,
  Body,
  Container,
  Section,
  Row,
  Column,
  Heading,
  Text,
  Button,
  Hr
} from '@react-email/components'
import { EnrollmentEmailData, EMAIL_CONFIG, EMAIL_STYLES, formatEmailDate } from '../index'

interface EnrollmentConfirmationEmailProps {
  data: EnrollmentEmailData
}

/**
 * 🌟 Enrollment Confirmation Email Template
 * 
 * Creates an official confirmation email with all the important
 * details families need to know about their enrollment
 */
export default function EnrollmentConfirmationEmail({ data }: EnrollmentConfirmationEmailProps) {
  const {
    parentName,
    childName,
    program,
    startDate,
    classroom,
    teacher,
    tuition,
    nextSteps
  } = data

  // Format tuition as currency
  const formattedTuition = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(tuition)

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Arial"
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
            format: 'woff2',
          }}
        />
      </Head>
      
      {/* Email preview text */}
      <Preview>
        🎉 Enrollment Confirmed! {childName} is officially enrolled in our {program} program
      </Preview>
      
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          
          {/* 🎊 Celebratory Header */}
          <Section style={headerStyle}>
            <Row>
              <Column>
                <Heading style={logoStyle}>
                  🌟 {EMAIL_CONFIG.business.name}
                </Heading>
                <Text style={taglineStyle}>
                  🎉 ENROLLMENT CONFIRMED! 🎉
                </Text>
              </Column>
            </Row>
          </Section>

          <Section style={contentStyle}>
            
            {/* 🎊 Confirmation Banner */}
            <Section style={confirmationBannerStyle}>
              <Heading style={confirmationHeadingStyle}>
                🎊 Congratulations!
              </Heading>
              
              <Text style={confirmationSubtitleStyle}>
                <strong>{childName}</strong> is officially enrolled at Great Beginnings Day Care!
              </Text>
              
              <Text style={confirmationTextStyle}>
                We're absolutely thrilled to welcome your family and can't wait 
                to begin this amazing journey together!
              </Text>
            </Section>
            
            <Text style={greetingStyle}>
              Dear {parentName}, 👋
            </Text>
            
            <Text style={paragraphStyle}>
              Thank you for choosing Great Beginnings Day Care for <strong>{childName}</strong>'s 
              early childhood education! Your enrollment has been successfully processed, 
              and we're excited to share all the important details below.
            </Text>

            {/* 📋 Enrollment Details */}
            <Section style={enrollmentDetailsStyle}>
              <Heading style={sectionHeadingStyle}>
                📋 Enrollment Details
              </Heading>
              
              <Section style={detailsGridStyle}>
                <Row style={detailRowStyle}>
                  <Column style={iconColumnStyle}>
                    <Text style={iconStyle}>👶</Text>
                  </Column>
                  <Column style={labelColumnStyle}>
                    <Text style={labelStyle}>Child's Name:</Text>
                  </Column>
                  <Column style={valueColumnStyle}>
                    <Text style={childNameStyle}>{childName}</Text>
                  </Column>
                </Row>
                
                <Row style={detailRowStyle}>
                  <Column style={iconColumnStyle}>
                    <Text style={iconStyle}>🎓</Text>
                  </Column>
                  <Column style={labelColumnStyle}>
                    <Text style={labelStyle}>Program:</Text>
                  </Column>
                  <Column style={valueColumnStyle}>
                    <Text style={programStyle}>{program}</Text>
                  </Column>
                </Row>
                
                <Row style={detailRowStyle}>
                  <Column style={iconColumnStyle}>
                    <Text style={iconStyle}>📅</Text>
                  </Column>
                  <Column style={labelColumnStyle}>
                    <Text style={labelStyle}>Start Date:</Text>
                  </Column>
                  <Column style={valueColumnStyle}>
                    <Text style={startDateStyle}>{formatEmailDate(startDate)}</Text>
                  </Column>
                </Row>
                
                <Row style={detailRowStyle}>
                  <Column style={iconColumnStyle}>
                    <Text style={iconStyle}>🏠</Text>
                  </Column>
                  <Column style={labelColumnStyle}>
                    <Text style={labelStyle}>Classroom:</Text>
                  </Column>
                  <Column style={valueColumnStyle}>
                    <Text style={valueStyle}>{classroom}</Text>
                  </Column>
                </Row>
                
                <Row style={detailRowStyle}>
                  <Column style={iconColumnStyle}>
                    <Text style={iconStyle}>👩‍🏫</Text>
                  </Column>
                  <Column style={labelColumnStyle}>
                    <Text style={labelStyle}>Lead Teacher:</Text>
                  </Column>
                  <Column style={valueColumnStyle}>
                    <Text style={teacherStyle}>{teacher}</Text>
                  </Column>
                </Row>
                
                <Row style={detailRowStyle}>
                  <Column style={iconColumnStyle}>
                    <Text style={iconStyle}>💰</Text>
                  </Column>
                  <Column style={labelColumnStyle}>
                    <Text style={labelStyle}>Monthly Tuition:</Text>
                  </Column>
                  <Column style={valueColumnStyle}>
                    <Text style={tuitionStyle}>{formattedTuition}</Text>
                  </Column>
                </Row>
              </Section>
            </Section>

            {/* 📝 Important Next Steps */}
            <Section style={nextStepsSection}>
              <Heading style={sectionHeadingStyle}>
                📝 Important Next Steps
              </Heading>
              
              <Text style={paragraphStyle}>
                To ensure a smooth start for {childName}, please complete 
                these important steps before their first day:
              </Text>
              
              <Section style={stepsListStyle}>
                {nextSteps.map((step, index) => (
                  <Row key={index} style={stepRowStyle}>
                    <Column style={stepNumberColumnStyle}>
                      <Text style={stepNumberStyle}>{index + 1}</Text>
                    </Column>
                    <Column style={stepTextColumnStyle}>
                      <Text style={stepTextStyle}>{step}</Text>
                    </Column>
                  </Row>
                ))}
              </Section>
            </Section>

            {/* 💳 Payment Information */}
            <Section style={paymentSectionStyle}>
              <Heading style={paymentHeadingStyle}>
                💳 Payment Information
              </Heading>
              
              <Text style={paragraphStyle}>
                Your monthly tuition of <strong>{formattedTuition}</strong> is due 
                on the 1st of each month. Here are your payment options:
              </Text>
              
              <Section style={paymentOptionsStyle}>
                <Row style={paymentRowStyle}>
                  <Column style={paymentColumnStyle}>
                    <Text style={paymentMethodIconStyle}>🏦</Text>
                    <Text style={paymentMethodTitleStyle}>Auto-Pay</Text>
                    <Text style={paymentMethodTextStyle}>
                      Set up automatic monthly payments (recommended)
                    </Text>
                  </Column>
                  <Column style={paymentColumnStyle}>
                    <Text style={paymentMethodIconStyle}>💳</Text>
                    <Text style={paymentMethodTitleStyle}>Online Portal</Text>
                    <Text style={paymentMethodTextStyle}>
                      Pay monthly through our secure parent portal
                    </Text>
                  </Column>
                </Row>
                
                <Row style={paymentRowStyle}>
                  <Column style={paymentColumnStyle}>
                    <Text style={paymentMethodIconStyle}>💰</Text>
                    <Text style={paymentMethodTitleStyle}>In-Person</Text>
                    <Text style={paymentMethodTextStyle}>
                      Cash, check, or card payments at our front desk
                    </Text>
                  </Column>
                  <Column style={paymentColumnStyle}>
                    <Text style={paymentMethodIconStyle}>📧</Text>
                    <Text style={paymentMethodTitleStyle}>Mail</Text>
                    <Text style={paymentMethodTextStyle}>
                      Send checks to our business address
                    </Text>
                  </Column>
                </Row>
              </Section>
              
              <Section style={buttonSectionStyle}>
                <Button style={paymentButtonStyle} href={`${EMAIL_CONFIG.business.website}/payment`}>
                  💳 Set Up Payment Method
                </Button>
              </Section>
            </Section>

            {/* 🌟 What Makes Us Special */}
            <Section style={specialSectionStyle}>
              <Heading style={specialHeadingStyle}>
                🌟 What Makes Us Special
              </Heading>
              
              <Text style={paragraphStyle}>
                Here's what {childName} can look forward to at Great Beginnings:
              </Text>
              
              <Section style={featuresGridStyle}>
                <Row style={featureRowStyle}>
                  <Column style={featureColumnStyle}>
                    <Text style={featureIconStyle}>🎨</Text>
                    <Text style={featureTitleStyle}>Creative Arts</Text>
                    <Text style={featureTextStyle}>
                      Daily art projects, music, and creative expression
                    </Text>
                  </Column>
                  <Column style={featureColumnStyle}>
                    <Text style={featureIconStyle}>📚</Text>
                    <Text style={featureTitleStyle}>Early Learning</Text>
                    <Text style={featureTextStyle}>
                      Age-appropriate curriculum and school readiness
                    </Text>
                  </Column>
                </Row>
                
                <Row style={featureRowStyle}>
                  <Column style={featureColumnStyle}>
                    <Text style={featureIconStyle}>🌱</Text>
                    <Text style={featureTitleStyle}>Outdoor Play</Text>
                    <Text style={featureTextStyle}>
                      Safe playground and nature exploration activities
                    </Text>
                  </Column>
                  <Column style={featureColumnStyle}>
                    <Text style={featureIconStyle}>❤️</Text>
                    <Text style={featureTitleStyle}>Loving Care</Text>
                    <Text style={featureTextStyle}>
                      Experienced teachers who truly care about each child
                    </Text>
                  </Column>
                </Row>
              </Section>
            </Section>

            {/* 📱 Parent Resources */}
            <Section style={resourcesSectionStyle}>
              <Heading style={resourcesHeadingStyle}>
                📱 Parent Resources
              </Heading>
              
              <Text style={paragraphStyle}>
                Access these helpful resources to stay connected and informed:
              </Text>
              
              <Section style={resourcesGridStyle}>
                <Row style={resourceRowStyle}>
                  <Column style={resourceButtonColumnStyle}>
                    <Button style={resourceButtonStyle} href={`${EMAIL_CONFIG.business.website}/portal`}>
                      📱 Parent Portal
                    </Button>
                  </Column>
                  <Column style={resourceButtonColumnStyle}>
                    <Button style={resourceButtonStyle} href={`${EMAIL_CONFIG.business.website}/handbook`}>
                      📖 Parent Handbook
                    </Button>
                  </Column>
                </Row>
                
                <Row style={resourceRowStyle}>
                  <Column style={resourceButtonColumnStyle}>
                    <Button style={resourceButtonStyle} href={`${EMAIL_CONFIG.business.website}/calendar`}>
                      📅 School Calendar
                    </Button>
                  </Column>
                  <Column style={resourceButtonColumnStyle}>
                    <Button style={resourceButtonStyle} href={`${EMAIL_CONFIG.business.website}/forms`}>
                      📋 Forms Library
                    </Button>
                  </Column>
                </Row>
              </Section>
            </Section>

            <Hr style={dividerStyle} />

            {/* 📞 Contact Information */}
            <Section style={contactSectionStyle}>
              <Heading style={contactHeadingStyle}>
                📞 Questions? We're Here to Help!
              </Heading>
              
              <Text style={paragraphStyle}>
                Our team is always available to answer questions and provide support:
              </Text>
              
              <Text style={contactInfoStyle}>
                📞 <strong>Main Office:</strong> {EMAIL_CONFIG.business.phone}<br />
                📧 <strong>Email:</strong> {EMAIL_CONFIG.business.email}<br />
                📍 <strong>Address:</strong> {EMAIL_CONFIG.business.address}<br />
                🕒 <strong>Office Hours:</strong> Monday-Friday, 6:30 AM - 6:00 PM
              </Text>
            </Section>

            {/* 🎉 Final Celebration Message */}
            <Section style={finalMessageStyle}>
              <Text style={celebrationTextStyle}>
                🎉 Welcome to the Great Beginnings Family! 🎉
              </Text>
              
              <Text style={finalTextStyle}>
                We're honored that you've chosen us for {childName}'s early learning 
                journey. Our entire team is committed to providing exceptional care, 
                fostering creativity, and helping every child reach their full potential.
              </Text>
              
              <Text style={finalTextStyle}>
                Get ready for an amazing adventure filled with learning, laughter, 
                and lots of love! We can't wait to see {childName} grow and thrive 
                with us. 🌟
              </Text>
              
              <Text style={signatureStyle}>
                With excitement and gratitude,<br />
                <strong>The Great Beginnings Team</strong> 💙
              </Text>
            </Section>
          </Section>

          {/* 🏢 Footer */}
          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              This enrollment confirmation was sent for {childName}'s enrollment 
              in the {program} program starting {formatEmailDate(startDate)}.
            </Text>
            
            <Text style={footerSmallStyle}>
              Please save this email for your records. If you need to make any 
              changes, contact us immediately at {EMAIL_CONFIG.business.phone}.
            </Text>
          </Section>
          
        </Container>
      </Body>
    </Html>
  )
}

/**
 * 🎨 Beautiful Email Styles
 * Official yet warm styling for our enrollment confirmation
 */

const bodyStyle = {
  backgroundColor: '#F0F9FF', // Professional blue background
  margin: '0',
  padding: '20px',
  fontFamily: EMAIL_STYLES.fonts.body
}

const containerStyle = {
  backgroundColor: EMAIL_STYLES.colors.white,
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
  maxWidth: '700px',
  margin: '0 auto'
}

const headerStyle = {
  background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 50%, #06B6D4 100%)',
  padding: `${EMAIL_STYLES.spacing.xl} ${EMAIL_STYLES.spacing.lg}`,
  textAlign: 'center' as const
}

const logoStyle = {
  color: EMAIL_STYLES.colors.white,
  fontSize: '32px',
  fontWeight: '700',
  margin: '0 0 8px 0',
  textAlign: 'center' as const
}

const taglineStyle = {
  color: EMAIL_STYLES.colors.white,
  fontSize: '18px',
  margin: '0',
  fontWeight: '600',
  textAlign: 'center' as const,
  letterSpacing: '1px'
}

const contentStyle = {
  padding: `${EMAIL_STYLES.spacing.xl} ${EMAIL_STYLES.spacing.lg}`
}

const confirmationBannerStyle = {
  backgroundColor: '#DCFCE7',
  border: '3px solid #16A34A',
  borderRadius: '16px',
  padding: `${EMAIL_STYLES.spacing.xl} ${EMAIL_STYLES.spacing.lg}`,
  textAlign: 'center' as const,
  margin: '0 0 32px 0'
}

const confirmationHeadingStyle = {
  color: '#15803D',
  fontSize: '32px',
  fontWeight: '700',
  margin: '0 0 12px 0',
  textAlign: 'center' as const
}

const confirmationSubtitleStyle = {
  color: '#166534',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 16px 0',
  textAlign: 'center' as const
}

const confirmationTextStyle = {
  color: '#166534',
  fontSize: '16px',
  margin: '0',
  textAlign: 'center' as const
}

const greetingStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 20px 0'
}

const paragraphStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '16px',
  lineHeight: '1.7',
  margin: '0 0 18px 0'
}

const enrollmentDetailsStyle = {
  backgroundColor: '#F8FAFC',
  border: `3px solid ${EMAIL_STYLES.colors.primary}`,
  borderRadius: '12px',
  padding: EMAIL_STYLES.spacing.xl,
  margin: '32px 0'
}

const sectionHeadingStyle = {
  color: EMAIL_STYLES.colors.primary,
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 24px 0',
  textAlign: 'center' as const
}

const detailsGridStyle = {
  margin: '0'
}

const detailRowStyle = {
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center'
}

const iconColumnStyle = {
  width: '8%'
}

const labelColumnStyle = {
  width: '40%'
}

const valueColumnStyle = {
  width: '52%'
}

const iconStyle = {
  fontSize: '20px',
  margin: '0'
}

const labelStyle = {
  color: EMAIL_STYLES.colors.lightText,
  fontSize: '15px',
  fontWeight: '600',
  margin: '0'
}

const childNameStyle = {
  color: EMAIL_STYLES.colors.primary,
  fontSize: '16px',
  fontWeight: '700',
  margin: '0'
}

const programStyle = {
  color: EMAIL_STYLES.colors.secondary,
  fontSize: '16px',
  fontWeight: '600',
  margin: '0'
}

const startDateStyle = {
  color: EMAIL_STYLES.colors.accent,
  fontSize: '16px',
  fontWeight: '700',
  margin: '0'
}

const valueStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '15px',
  fontWeight: '500',
  margin: '0'
}

const teacherStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '15px',
  fontWeight: '600',
  margin: '0'
}

const tuitionStyle = {
  color: '#059669',
  fontSize: '18px',
  fontWeight: '700',
  margin: '0'
}

const nextStepsSection = {
  margin: '32px 0'
}

const stepsListStyle = {
  backgroundColor: '#FFFBEB',
  border: '2px solid #F59E0B',
  borderRadius: '10px',
  padding: EMAIL_STYLES.spacing.lg,
  margin: '20px 0'
}

const stepRowStyle = {
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'flex-start'
}

const stepNumberColumnStyle = {
  width: '12%'
}

const stepTextColumnStyle = {
  width: '88%'
}

const stepNumberStyle = {
  backgroundColor: EMAIL_STYLES.colors.primary,
  color: EMAIL_STYLES.colors.white,
  borderRadius: '50%',
  width: '24px',
  height: '24px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0'
}

const stepTextStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0',
  paddingLeft: '8px'
}

const paymentSectionStyle = {
  backgroundColor: '#F0FDF4',
  border: '2px solid #10B981',
  borderRadius: '12px',
  padding: EMAIL_STYLES.spacing.lg,
  margin: '32px 0'
}

const paymentHeadingStyle = {
  color: EMAIL_STYLES.colors.secondary,
  fontSize: '22px',
  fontWeight: '600',
  margin: '0 0 16px 0'
}

const paymentOptionsStyle = {
  margin: '20px 0'
}

const paymentRowStyle = {
  marginBottom: '16px'
}

const paymentColumnStyle = {
  width: '50%',
  padding: '0 8px',
  textAlign: 'center' as const
}

const paymentMethodIconStyle = {
  fontSize: '24px',
  margin: '0 0 8px 0',
  display: 'block'
}

const paymentMethodTitleStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 6px 0'
}

const paymentMethodTextStyle = {
  color: EMAIL_STYLES.colors.lightText,
  fontSize: '13px',
  lineHeight: '1.4',
  margin: '0'
}

const paymentButtonStyle = {
  backgroundColor: EMAIL_STYLES.colors.secondary,
  color: EMAIL_STYLES.colors.white,
  borderRadius: '10px',
  padding: '14px 28px',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  display: 'inline-block'
}

const buttonSectionStyle = {
  textAlign: 'center' as const,
  margin: '24px 0'
}

const specialSectionStyle = {
  margin: '32px 0'
}

const specialHeadingStyle = {
  color: EMAIL_STYLES.colors.accent,
  fontSize: '22px',
  fontWeight: '600',
  margin: '0 0 20px 0'
}

const featuresGridStyle = {
  margin: '20px 0'
}

const featureRowStyle = {
  marginBottom: '20px'
}

const featureColumnStyle = {
  width: '50%',
  padding: `0 ${EMAIL_STYLES.spacing.sm}`,
  textAlign: 'center' as const
}

const featureIconStyle = {
  fontSize: '28px',
  margin: '0 0 8px 0',
  display: 'block'
}

const featureTitleStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 6px 0'
}

const featureTextStyle = {
  color: EMAIL_STYLES.colors.lightText,
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0'
}

const resourcesSectionStyle = {
  backgroundColor: EMAIL_STYLES.colors.background,
  border: '2px solid #E5E7EB',
  borderRadius: '12px',
  padding: EMAIL_STYLES.spacing.lg,
  margin: '32px 0'
}

const resourcesHeadingStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 16px 0'
}

const resourcesGridStyle = {
  margin: '20px 0'
}

const resourceRowStyle = {
  marginBottom: '12px'
}

const resourceButtonColumnStyle = {
  width: '50%',
  padding: '0 6px'
}

const resourceButtonStyle = {
  backgroundColor: '#6B7280',
  color: EMAIL_STYLES.colors.white,
  borderRadius: '8px',
  padding: '10px 16px',
  fontSize: '14px',
  fontWeight: '500',
  textDecoration: 'none',
  display: 'inline-block',
  width: '100%',
  textAlign: 'center' as const
}

const dividerStyle = {
  border: 'none',
  borderTop: `2px solid ${EMAIL_STYLES.colors.lightText}`,
  margin: '40px 0',
  opacity: '0.3'
}

const contactSectionStyle = {
  margin: '24px 0'
}

const contactHeadingStyle = {
  color: EMAIL_STYLES.colors.accent,
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 16px 0'
}

const contactInfoStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '15px',
  lineHeight: '1.7',
  margin: '16px 0'
}

const finalMessageStyle = {
  textAlign: 'center' as const,
  margin: '32px 0'
}

const celebrationTextStyle = {
  color: EMAIL_STYLES.colors.secondary,
  fontSize: '24px',
  fontWeight: '700',
  margin: '0 0 20px 0',
  textAlign: 'center' as const
}

const finalTextStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '16px',
  lineHeight: '1.7',
  margin: '0 0 16px 0',
  textAlign: 'center' as const
}

const signatureStyle = {
  color: EMAIL_STYLES.colors.primary,
  fontSize: '16px',
  margin: '24px 0 0 0',
  textAlign: 'center' as const
}

const footerStyle = {
  backgroundColor: EMAIL_STYLES.colors.background,
  padding: `${EMAIL_STYLES.spacing.lg} ${EMAIL_STYLES.spacing.md}`,
  textAlign: 'center' as const
}

const footerTextStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '14px',
  margin: '0 0 12px 0'
}

const footerSmallStyle = {
  color: EMAIL_STYLES.colors.lightText,
  fontSize: '12px',
  margin: '0'
}