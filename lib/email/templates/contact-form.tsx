/**
 * 📝 Contact Form Submission Email Template
 * 
 * This template creates emails for when families send us messages
 * through our website contact form. It's like getting a letter
 * in the mail, but much faster and prettier!
 * 
 * We send two emails:
 * 1. To our staff - so they know someone contacted us
 * 2. To the family - to confirm we got their message
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
import { ContactFormEmailData, EMAIL_CONFIG, EMAIL_STYLES, formatEmailDate, formatPhoneNumber } from '../index'

interface ContactFormEmailProps {
  data: ContactFormEmailData
  type: 'staff' | 'confirmation'
}

/**
 * 🌟 Contact Form Email Template
 * 
 * This creates two different email types:
 * - Staff notification: Tells our team about new inquiries
 * - Confirmation: Lets families know we received their message
 */
export default function ContactFormEmail({ data, type }: ContactFormEmailProps) {
  const {
    name,
    email,
    phone,
    message,
    inquiryType,
    submittedAt
  } = data

  // Different content based on email type
  const isStaffEmail = type === 'staff'
  const isConfirmationEmail = type === 'confirmation'

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
        {isStaffEmail 
          ? `New ${inquiryType} inquiry from ${name}`
          : `Thank you for contacting ${EMAIL_CONFIG.business.name}`
        }
      </Preview>
      
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          
          {/* 🏢 Header */}
          <Section style={headerStyle}>
            <Row>
              <Column>
                <Heading style={logoStyle}>
                  🌟 {EMAIL_CONFIG.business.name}
                </Heading>
                <Text style={taglineStyle}>
                  Where Every Day is a New Adventure!
                </Text>
              </Column>
            </Row>
          </Section>

          <Section style={contentStyle}>
            
            {/* Staff Email Content */}
            {isStaffEmail && (
              <>
                <Heading style={headingStyle}>
                  📝 New Website Inquiry
                </Heading>
                
                <Text style={urgencyStyle}>
                  🚨 <strong>Action Required:</strong> Please respond within 24 hours
                </Text>
                
                <Text style={paragraphStyle}>
                  A new inquiry has been submitted through the website contact form. 
                  Please review the details below and follow up promptly.
                </Text>

                {/* 👤 Contact Information */}
                <Section style={detailsBoxStyle}>
                  <Heading style={detailsHeadingStyle}>
                    👤 Contact Information
                  </Heading>
                  
                  <Row style={detailRowStyle}>
                    <Column style={labelColumnStyle}>
                      <Text style={labelStyle}>Name:</Text>
                    </Column>
                    <Column style={valueColumnStyle}>
                      <Text style={valueStyle}>{name}</Text>
                    </Column>
                  </Row>
                  
                  <Row style={detailRowStyle}>
                    <Column style={labelColumnStyle}>
                      <Text style={labelStyle}>Email:</Text>
                    </Column>
                    <Column style={valueColumnStyle}>
                      <Text style={valueStyleLink}>
                        <a href={`mailto:${email}`} style={linkStyle}>{email}</a>
                      </Text>
                    </Column>
                  </Row>
                  
                  {phone && (
                    <Row style={detailRowStyle}>
                      <Column style={labelColumnStyle}>
                        <Text style={labelStyle}>Phone:</Text>
                      </Column>
                      <Column style={valueColumnStyle}>
                        <Text style={valueStyleLink}>
                          <a href={`tel:${phone}`} style={linkStyle}>
                            {formatPhoneNumber(phone)}
                          </a>
                        </Text>
                      </Column>
                    </Row>
                  )}
                  
                  <Row style={detailRowStyle}>
                    <Column style={labelColumnStyle}>
                      <Text style={labelStyle}>Inquiry Type:</Text>
                    </Column>
                    <Column style={valueColumnStyle}>
                      <Text style={inquiryTypeStyle}>{inquiryType}</Text>
                    </Column>
                  </Row>
                  
                  <Row style={detailRowStyle}>
                    <Column style={labelColumnStyle}>
                      <Text style={labelStyle}>Submitted:</Text>
                    </Column>
                    <Column style={valueColumnStyle}>
                      <Text style={valueStyle}>{formatEmailDate(submittedAt)}</Text>
                    </Column>
                  </Row>
                </Section>

                {/* 💬 Message */}
                <Section style={messageBoxStyle}>
                  <Heading style={messageHeadingStyle}>
                    💬 Their Message
                  </Heading>
                  <Text style={messageTextStyle}>
                    {message}
                  </Text>
                </Section>

                {/* 🎯 Quick Actions */}
                <Section style={actionSectionStyle}>
                  <Heading style={actionHeadingStyle}>
                    🎯 Quick Actions
                  </Heading>
                  
                  <Row style={buttonRowStyle}>
                    <Column style={buttonColumnStyle}>
                      <Button 
                        style={primaryButtonStyle} 
                        href={`mailto:${email}?subject=Re: Your inquiry about ${inquiryType}`}
                      >
                        📧 Reply by Email
                      </Button>
                    </Column>
                    {phone && (
                      <Column style={buttonColumnStyle}>
                        <Button 
                          style={secondaryButtonStyle} 
                          href={`tel:${phone}`}
                        >
                          📞 Call Now
                        </Button>
                      </Column>
                    )}
                  </Row>
                </Section>
              </>
            )}

            {/* Confirmation Email Content */}
            {isConfirmationEmail && (
              <>
                <Heading style={headingStyle}>
                  ✨ Thank You for Contacting Us!
                </Heading>
                
                <Text style={greetingStyle}>
                  Hello {name}! 👋
                </Text>
                
                <Text style={paragraphStyle}>
                  We've received your message about <strong>{inquiryType}</strong> and 
                  we're excited to help you learn more about our daycare programs!
                </Text>
                
                <Text style={paragraphStyle}>
                  Our friendly team will review your inquiry and get back to you within 
                  <strong> 24 hours</strong> (usually much sooner!). We can't wait to 
                  talk with you about your child's early learning journey.
                </Text>

                {/* 📋 What they sent us */}
                <Section style={confirmationBoxStyle}>
                  <Heading style={confirmationHeadingStyle}>
                    📋 Your Message Summary
                  </Heading>
                  
                  <Row style={detailRowStyle}>
                    <Column style={labelColumnStyle}>
                      <Text style={labelStyle}>Inquiry Type:</Text>
                    </Column>
                    <Column style={valueColumnStyle}>
                      <Text style={valueStyle}>{inquiryType}</Text>
                    </Column>
                  </Row>
                  
                  <Row style={detailRowStyle}>
                    <Column style={labelColumnStyle}>
                      <Text style={labelStyle}>Submitted:</Text>
                    </Column>
                    <Column style={valueColumnStyle}>
                      <Text style={valueStyle}>{formatEmailDate(submittedAt)}</Text>
                    </Column>
                  </Row>
                  
                  <Section style={messagePreviewStyle}>
                    <Text style={labelStyle}>Your Message:</Text>
                    <Text style={messagePreviewTextStyle}>
                      {message.length > 150 
                        ? `${message.substring(0, 150)}...` 
                        : message
                      }
                    </Text>
                  </Section>
                </Section>

                {/* 🏠 Visit us section */}
                <Section style={visitSectionStyle}>
                  <Heading style={visitHeadingStyle}>
                    🏠 Come Visit Us!
                  </Heading>
                  
                  <Text style={paragraphStyle}>
                    While you wait for our response, feel free to drive by and see 
                    our beautiful facility! We'd love to give you a tour and introduce 
                    you to our amazing teachers.
                  </Text>
                  
                  <Section style={buttonSectionStyle}>
                    <Button style={primaryButtonStyle} href={EMAIL_CONFIG.business.website}>
                      🌐 Learn More About Us
                    </Button>
                  </Section>
                </Section>
              </>
            )}

            <Hr style={dividerStyle} />

            {/* 📞 Contact information */}
            <Section style={contactSectionStyle}>
              <Heading style={contactHeadingStyle}>
                📞 Questions? We're Here to Help!
              </Heading>
              
              <Text style={paragraphStyle}>
                {isStaffEmail 
                  ? 'Please respond to this inquiry promptly to provide excellent customer service.'
                  : 'If you have any urgent questions or would like to speak with us right away:'
                }
              </Text>
              
              <Text style={contactInfoStyle}>
                📞 <strong>Phone:</strong> {EMAIL_CONFIG.business.phone}<br />
                📧 <strong>Email:</strong> {EMAIL_CONFIG.business.email}<br />
                📍 <strong>Address:</strong> {EMAIL_CONFIG.business.address}<br />
                🕒 <strong>Hours:</strong> Monday-Friday, 6:30 AM - 6:00 PM
              </Text>
            </Section>
          </Section>

          {/* 🏢 Footer */}
          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              {isStaffEmail 
                ? 'This inquiry was submitted through the website contact form. Please respond promptly.'
                : `Thank you for considering ${EMAIL_CONFIG.business.name} for your child's care! 🌈`
              }
            </Text>
            
            <Text style={footerSmallStyle}>
              {isStaffEmail 
                ? `Inquiry ID: ${submittedAt.getTime()} | Priority: ${inquiryType}`
                : 'This email confirms your contact form submission. No reply is needed.'
              }
            </Text>
          </Section>
          
        </Container>
      </Body>
    </Html>
  )
}

/**
 * 🎨 Email Styles
 * Beautiful styling for our contact form emails
 */

const bodyStyle = {
  backgroundColor: EMAIL_STYLES.colors.background,
  margin: '0',
  padding: '20px',
  fontFamily: EMAIL_STYLES.fonts.body
}

const containerStyle = {
  backgroundColor: EMAIL_STYLES.colors.white,
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  maxWidth: '600px',
  margin: '0 auto'
}

const headerStyle = {
  backgroundColor: EMAIL_STYLES.colors.primary,
  padding: EMAIL_STYLES.spacing.lg,
  textAlign: 'center' as const
}

const logoStyle = {
  color: EMAIL_STYLES.colors.white,
  fontSize: '28px',
  fontWeight: '600',
  margin: '0 0 8px 0',
  textAlign: 'center' as const
}

const taglineStyle = {
  color: EMAIL_STYLES.colors.white,
  fontSize: '14px',
  margin: '0',
  opacity: '0.9',
  textAlign: 'center' as const
}

const contentStyle = {
  padding: EMAIL_STYLES.spacing.xl
}

const headingStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 24px 0',
  textAlign: 'center' as const
}

const urgencyStyle = {
  backgroundColor: '#FEF2F2',
  border: '2px solid #EF4444',
  borderRadius: '8px',
  padding: EMAIL_STYLES.spacing.md,
  color: '#DC2626',
  fontSize: '14px',
  margin: '0 0 24px 0',
  textAlign: 'center' as const
}

const greetingStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '18px',
  fontWeight: '500',
  margin: '0 0 16px 0'
}

const paragraphStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px 0'
}

const detailsBoxStyle = {
  backgroundColor: EMAIL_STYLES.colors.background,
  border: `2px solid ${EMAIL_STYLES.colors.primary}`,
  borderRadius: '8px',
  padding: EMAIL_STYLES.spacing.lg,
  margin: '24px 0'
}

const confirmationBoxStyle = {
  backgroundColor: EMAIL_STYLES.colors.background,
  border: `2px solid ${EMAIL_STYLES.colors.secondary}`,
  borderRadius: '8px',
  padding: EMAIL_STYLES.spacing.lg,
  margin: '24px 0'
}

const detailsHeadingStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 16px 0'
}

const confirmationHeadingStyle = {
  color: EMAIL_STYLES.colors.secondary,
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 16px 0'
}

const detailRowStyle = {
  marginBottom: EMAIL_STYLES.spacing.sm
}

const labelColumnStyle = {
  width: '35%'
}

const valueColumnStyle = {
  width: '65%'
}

const labelStyle = {
  color: EMAIL_STYLES.colors.lightText,
  fontSize: '14px',
  fontWeight: '500',
  margin: '0'
}

const valueStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '14px',
  fontWeight: '400',
  margin: '0'
}

const valueStyleLink = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '14px',
  fontWeight: '400',
  margin: '0'
}

const linkStyle = {
  color: EMAIL_STYLES.colors.primary,
  textDecoration: 'none'
}

const inquiryTypeStyle = {
  color: EMAIL_STYLES.colors.accent,
  fontSize: '14px',
  fontWeight: '600',
  margin: '0'
}

const messageBoxStyle = {
  backgroundColor: '#F0F9FF',
  border: `2px solid ${EMAIL_STYLES.colors.secondary}`,
  borderRadius: '8px',
  padding: EMAIL_STYLES.spacing.lg,
  margin: '24px 0'
}

const messageHeadingStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 16px 0'
}

const messageTextStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0',
  fontStyle: 'italic',
  backgroundColor: EMAIL_STYLES.colors.white,
  padding: EMAIL_STYLES.spacing.md,
  borderRadius: '6px',
  border: '1px solid #E5E7EB'
}

const messagePreviewStyle = {
  marginTop: EMAIL_STYLES.spacing.md
}

const messagePreviewTextStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '8px 0 0 0',
  fontStyle: 'italic',
  backgroundColor: EMAIL_STYLES.colors.white,
  padding: EMAIL_STYLES.spacing.sm,
  borderRadius: '6px',
  border: '1px solid #E5E7EB'
}

const actionSectionStyle = {
  margin: '32px 0'
}

const actionHeadingStyle = {
  color: EMAIL_STYLES.colors.accent,
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 16px 0'
}

const buttonRowStyle = {
  marginTop: EMAIL_STYLES.spacing.md
}

const buttonColumnStyle = {
  width: '50%',
  padding: '0 8px'
}

const primaryButtonStyle = {
  backgroundColor: EMAIL_STYLES.colors.primary,
  color: EMAIL_STYLES.colors.white,
  borderRadius: '8px',
  padding: '12px 20px',
  fontSize: '14px',
  fontWeight: '500',
  textDecoration: 'none',
  display: 'inline-block',
  width: '100%',
  textAlign: 'center' as const
}

const secondaryButtonStyle = {
  backgroundColor: EMAIL_STYLES.colors.secondary,
  color: EMAIL_STYLES.colors.white,
  borderRadius: '8px',
  padding: '12px 20px',
  fontSize: '14px',
  fontWeight: '500',
  textDecoration: 'none',
  display: 'inline-block',
  width: '100%',
  textAlign: 'center' as const
}

const buttonSectionStyle = {
  textAlign: 'center' as const,
  margin: '24px 0'
}

const visitSectionStyle = {
  margin: '32px 0'
}

const visitHeadingStyle = {
  color: EMAIL_STYLES.colors.secondary,
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 16px 0'
}

const dividerStyle = {
  border: 'none',
  borderTop: `1px solid ${EMAIL_STYLES.colors.lightText}`,
  margin: '32px 0',
  opacity: '0.3'
}

const contactSectionStyle = {
  margin: '24px 0'
}

const contactHeadingStyle = {
  color: EMAIL_STYLES.colors.accent,
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 16px 0'
}

const contactInfoStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '16px 0'
}

const footerStyle = {
  backgroundColor: EMAIL_STYLES.colors.background,
  padding: EMAIL_STYLES.spacing.lg,
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