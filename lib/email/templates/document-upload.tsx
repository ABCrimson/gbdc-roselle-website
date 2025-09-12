/**
 * 📄 Document Upload Notification Email Template
 * 
 * This template creates a beautiful email to let parents know
 * when we've received their important documents!
 * 
 * It's like sending a friendly note saying "We got your papers!"
 * with all the important details in a pretty format.
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
  Hr,
  Img
} from '@react-email/components'
import { DocumentUploadEmailData, EMAIL_CONFIG, EMAIL_STYLES, formatEmailDate } from '../index'

interface DocumentUploadEmailProps {
  data: DocumentUploadEmailData
}

/**
 * 🌟 Document Upload Email Template
 * 
 * This creates a friendly email that tells parents:
 * - We received their document
 * - What document it was
 * - When we got it
 * - What to do next
 */
export default function DocumentUploadEmail({ data }: DocumentUploadEmailProps) {
  const {
    parentName,
    childName,
    documentType,
    fileName,
    uploadDate,
    documentCount
  } = data

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
      {/* This text shows in the email preview - like a little sneak peek! */}
      <Preview>
        Document received for {childName} - {documentType}
      </Preview>
      
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          
          {/* 🏢 Header with our daycare logo and name */}
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

          {/* 📄 Main content area */}
          <Section style={contentStyle}>
            
            {/* Friendly greeting */}
            <Heading style={headingStyle}>
              📄 Document Successfully Received!
            </Heading>
            
            <Text style={greetingStyle}>
              Hello {parentName}! 👋
            </Text>
            
            <Text style={paragraphStyle}>
              Great news! We've successfully received and processed your document 
              for <strong>{childName}</strong>. Thank you for keeping your 
              child's information up to date with us.
            </Text>

            {/* 📋 Document details in a nice box */}
            <Section style={detailsBoxStyle}>
              <Heading style={detailsHeadingStyle}>
                📋 Document Details
              </Heading>
              
              <Row style={detailRowStyle}>
                <Column style={labelColumnStyle}>
                  <Text style={labelStyle}>Child's Name:</Text>
                </Column>
                <Column style={valueColumnStyle}>
                  <Text style={valueStyle}>{childName}</Text>
                </Column>
              </Row>
              
              <Row style={detailRowStyle}>
                <Column style={labelColumnStyle}>
                  <Text style={labelStyle}>Document Type:</Text>
                </Column>
                <Column style={valueColumnStyle}>
                  <Text style={valueStyle}>{documentType}</Text>
                </Column>
              </Row>
              
              <Row style={detailRowStyle}>
                <Column style={labelColumnStyle}>
                  <Text style={labelStyle}>File Name:</Text>
                </Column>
                <Column style={valueColumnStyle}>
                  <Text style={valueStyle}>{fileName}</Text>
                </Column>
              </Row>
              
              <Row style={detailRowStyle}>
                <Column style={labelColumnStyle}>
                  <Text style={labelStyle}>Received On:</Text>
                </Column>
                <Column style={valueColumnStyle}>
                  <Text style={valueStyle}>{formatEmailDate(uploadDate)}</Text>
                </Column>
              </Row>
              
              {documentCount > 1 && (
                <Row style={detailRowStyle}>
                  <Column style={labelColumnStyle}>
                    <Text style={labelStyle}>Total Documents:</Text>
                  </Column>
                  <Column style={valueColumnStyle}>
                    <Text style={valueStyle}>{documentCount} files</Text>
                  </Column>
                </Row>
              )}
            </Section>

            {/* ✅ What happens next */}
            <Section style={nextStepsStyle}>
              <Heading style={nextStepsHeadingStyle}>
                ✅ What Happens Next?
              </Heading>
              
              <Text style={paragraphStyle}>
                Our staff will review your document within <strong>1-2 business days</strong>. 
                If we need any additional information or have questions, we'll contact you directly.
              </Text>
              
              <Text style={paragraphStyle}>
                You can always check the status of your documents or upload 
                additional files through our parent portal.
              </Text>
            </Section>

            {/* 🔗 Action button to access portal */}
            <Section style={buttonSectionStyle}>
              <Button style={buttonStyle} href={`${EMAIL_CONFIG.business.website}/portal`}>
                📱 Access Parent Portal
              </Button>
            </Section>

            <Hr style={dividerStyle} />

            {/* 📞 Need help section */}
            <Section style={helpSectionStyle}>
              <Heading style={helpHeadingStyle}>
                Need Help? 🤝
              </Heading>
              
              <Text style={paragraphStyle}>
                If you have any questions about your document or need assistance, 
                our friendly staff is here to help!
              </Text>
              
              <Text style={contactStyle}>
                📞 <strong>Phone:</strong> {EMAIL_CONFIG.business.phone}<br />
                📧 <strong>Email:</strong> {EMAIL_CONFIG.business.email}<br />
                📍 <strong>Address:</strong> {EMAIL_CONFIG.business.address}
              </Text>
            </Section>
          </Section>

          {/* 🏢 Footer */}
          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              Thank you for choosing {EMAIL_CONFIG.business.name}! 
              We're honored to be part of your child's learning journey. 🌈
            </Text>
            
            <Text style={footerSmallStyle}>
              This email was sent regarding document upload for {childName}. 
              If you received this email in error, please contact us immediately.
            </Text>
          </Section>
          
        </Container>
      </Body>
    </Html>
  )
}

/**
 * 🎨 Email Styles
 * All the styling to make our email look beautiful and professional
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

const detailRowStyle = {
  marginBottom: EMAIL_STYLES.spacing.sm
}

const labelColumnStyle = {
  width: '40%'
}

const valueColumnStyle = {
  width: '60%'
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

const nextStepsStyle = {
  margin: '32px 0'
}

const nextStepsHeadingStyle = {
  color: EMAIL_STYLES.colors.secondary,
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 16px 0'
}

const buttonSectionStyle = {
  textAlign: 'center' as const,
  margin: '32px 0'
}

const buttonStyle = {
  backgroundColor: EMAIL_STYLES.colors.primary,
  color: EMAIL_STYLES.colors.white,
  borderRadius: '8px',
  padding: '12px 24px',
  fontSize: '16px',
  fontWeight: '500',
  textDecoration: 'none',
  display: 'inline-block'
}

const dividerStyle = {
  border: 'none',
  borderTop: `1px solid ${EMAIL_STYLES.colors.lightText}`,
  margin: '32px 0',
  opacity: '0.3'
}

const helpSectionStyle = {
  margin: '24px 0'
}

const helpHeadingStyle = {
  color: EMAIL_STYLES.colors.accent,
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 16px 0'
}

const contactStyle = {
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