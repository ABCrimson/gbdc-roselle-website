/**
 * 🌟 Welcome Email Template
 * 
 * This template creates a super special welcome email for new families
 * joining our daycare! It's like sending a warm hug through the internet
 * to make families feel excited about starting their journey with us.
 * 
 * This email includes:
 * - A big welcome message
 * - Important first-day information
 * - What to expect
 * - How to prepare
 * - Contact information for questions
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
import { WelcomeEmailData, EMAIL_CONFIG, EMAIL_STYLES, formatEmailDate } from '../index'

interface WelcomeEmailProps {
  data: WelcomeEmailData
}

/**
 * 🌈 Welcome Email Template
 * 
 * Creates a magical welcome email that makes families excited
 * about their child's first day and helps them feel prepared!
 */
export default function WelcomeEmail({ data }: WelcomeEmailProps) {
  const {
    parentName,
    childName,
    startDate,
    classroom,
    teacher
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
      
      {/* Email preview text - the first thing families see! */}
      <Preview>
        🌟 Welcome to Great Beginnings Day Care! {childName}'s adventure starts {formatEmailDate(startDate)}
      </Preview>
      
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          
          {/* 🎉 Super Special Header */}
          <Section style={headerStyle}>
            <Row>
              <Column>
                <Heading style={logoStyle}>
                  🌟 {EMAIL_CONFIG.business.name}
                </Heading>
                <Text style={taglineStyle}>
                  Welcome to Our Amazing Daycare Family! 🎉
                </Text>
              </Column>
            </Row>
          </Section>

          <Section style={contentStyle}>
            
            {/* 🎊 Big Welcome Message */}
            <Section style={welcomeBannerStyle}>
              <Heading style={welcomeHeadingStyle}>
                🎊 Welcome to the Family! 🎊
              </Heading>
              
              <Text style={welcomeTextStyle}>
                We are absolutely THRILLED to welcome <strong>{childName}</strong> 
                to our Great Beginnings family!
              </Text>
            </Section>
            
            <Text style={greetingStyle}>
              Dear {parentName}, 👋
            </Text>
            
            <Text style={paragraphStyle}>
              We're so excited that you've chosen us to be part of <strong>{childName}</strong>'s 
              learning journey! Our whole team has been preparing to make their first day 
              (and every day after) absolutely wonderful.
            </Text>
            
            <Text style={paragraphStyle}>
              We know starting daycare can feel like a big step for both you and {childName}, 
              and we're here to make it as smooth and joyful as possible. Let's get ready 
              for an amazing adventure together! 🚀
            </Text>

            {/* 📅 Important First Day Information */}
            <Section style={infoBoxStyle}>
              <Heading style={infoHeadingStyle}>
                📅 Your First Day Details
              </Heading>
              
              <Row style={detailRowStyle}>
                <Column style={iconColumnStyle}>
                  <Text style={iconStyle}>👶</Text>
                </Column>
                <Column style={labelColumnStyle}>
                  <Text style={labelStyle}>Child's Name:</Text>
                </Column>
                <Column style={valueColumnStyle}>
                  <Text style={valueStyle}>{childName}</Text>
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
                  <Text style={highlightValueStyle}>{formatEmailDate(startDate)}</Text>
                </Column>
              </Row>
              
              {classroom && (
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
              )}
              
              {teacher && (
                <Row style={detailRowStyle}>
                  <Column style={iconColumnStyle}>
                    <Text style={iconStyle}>👩‍🏫</Text>
                  </Column>
                  <Column style={labelColumnStyle}>
                    <Text style={labelStyle}>Lead Teacher:</Text>
                  </Column>
                  <Column style={valueColumnStyle}>
                    <Text style={valueStyle}>{teacher}</Text>
                  </Column>
                </Row>
              )}
              
              <Row style={detailRowStyle}>
                <Column style={iconColumnStyle}>
                  <Text style={iconStyle}>🕰️</Text>
                </Column>
                <Column style={labelColumnStyle}>
                  <Text style={labelStyle}>Hours:</Text>
                </Column>
                <Column style={valueColumnStyle}>
                  <Text style={valueStyle}>Monday-Friday, 6:30 AM - 6:00 PM</Text>
                </Column>
              </Row>
            </Section>

            {/* 🎒 What to Bring Checklist */}
            <Section style={checklistSectionStyle}>
              <Heading style={checklistHeadingStyle}>
                🎒 First Day Checklist
              </Heading>
              
              <Text style={paragraphStyle}>
                Here's what to bring on {childName}'s first day to make sure 
                they have everything they need:
              </Text>
              
              <Section style={checklistStyle}>
                <Text style={checklistItemStyle}>
                  ✅ <strong>Comfort Items:</strong> Favorite blanket, stuffed animal, or pacifier
                </Text>
                <Text style={checklistItemStyle}>
                  ✅ <strong>Extra Clothes:</strong> 2-3 complete outfit changes (accidents happen!)
                </Text>
                <Text style={checklistItemStyle}>
                  ✅ <strong>Diapers & Wipes:</strong> A week's supply (if not potty trained)
                </Text>
                <Text style={checklistItemStyle}>
                  ✅ <strong>Lunch & Snacks:</strong> Labeled containers with favorite foods
                </Text>
                <Text style={checklistItemStyle}>
                  ✅ <strong>Water Bottle:</strong> Spill-proof and labeled with {childName}'s name
                </Text>
                <Text style={checklistItemStyle}>
                  ✅ <strong>Medications:</strong> With completed authorization forms
                </Text>
              </Section>
              
              <Text style={tipStyle}>
                💡 <strong>Pro Tip:</strong> Label everything with {childName}'s name! 
                It helps us keep track of their belongings.
              </Text>
            </Section>

            {/* 🌈 What to Expect */}
            <Section style={expectationsSectionStyle}>
              <Heading style={expectationsHeadingStyle}>
                🌈 What to Expect
              </Heading>
              
              <Text style={paragraphStyle}>
                We want you to feel confident about {childName}'s experience with us:
              </Text>
              
              <Section style={expectationsGridStyle}>
                <Row style={expectationRowStyle}>
                  <Column style={expectationColumnStyle}>
                    <Text style={expectationIconStyle}>🤗</Text>
                    <Text style={expectationTitleStyle}>Warm Welcome</Text>
                    <Text style={expectationTextStyle}>
                      Our teachers will greet you and {childName} with big smiles 
                      and help with the transition.
                    </Text>
                  </Column>
                  <Column style={expectationColumnStyle}>
                    <Text style={expectationIconStyle}>🎨</Text>
                    <Text style={expectationTitleStyle}>Fun Activities</Text>
                    <Text style={expectationTextStyle}>
                      Age-appropriate games, crafts, and learning activities 
                      to keep {childName} engaged.
                    </Text>
                  </Column>
                </Row>
                
                <Row style={expectationRowStyle}>
                  <Column style={expectationColumnStyle}>
                    <Text style={expectationIconStyle}>📱</Text>
                    <Text style={expectationTitleStyle}>Regular Updates</Text>
                    <Text style={expectationTextStyle}>
                      We'll share photos and updates throughout the day 
                      so you know how they're doing.
                    </Text>
                  </Column>
                  <Column style={expectationColumnStyle}>
                    <Text style={expectationIconStyle}>❤️</Text>
                    <Text style={expectationTitleStyle}>Lots of Love</Text>
                    <Text style={expectationTextStyle}>
                      {childName} will receive plenty of attention, care, 
                      and encouragement from our loving staff.
                    </Text>
                  </Column>
                </Row>
              </Section>
            </Section>

            {/* 🌟 Special Welcome Message */}
            <Section style={specialMessageStyle}>
              <Heading style={specialMessageHeadingStyle}>
                🌟 A Special Message for {childName}
              </Heading>
              
              <Text style={childMessageStyle}>
                "Hi {childName}! 👋 We can't wait to meet you and become friends! 
                We have lots of fun toys, books, and games waiting for you. 
                Our teachers are super nice and we're going to have the BEST time 
                learning and playing together! See you soon! 🎈"
              </Text>
            </Section>

            {/* 📞 Important Contact Info */}
            <Section style={contactBoxStyle}>
              <Heading style={contactHeadingStyle}>
                📞 We're Always Here for You
              </Heading>
              
              <Text style={paragraphStyle}>
                Have questions before the first day? Need to talk during the day? 
                We're always available to help!
              </Text>
              
              <Text style={contactInfoStyle}>
                📞 <strong>Main Office:</strong> {EMAIL_CONFIG.business.phone}<br />
                📧 <strong>Email:</strong> {EMAIL_CONFIG.business.email}<br />
                📍 <strong>Address:</strong> {EMAIL_CONFIG.business.address}<br />
                🕒 <strong>Hours:</strong> Monday-Friday, 6:30 AM - 6:00 PM
              </Text>
              
              <Section style={buttonSectionStyle}>
                <Button style={primaryButtonStyle} href={`${EMAIL_CONFIG.business.website}/parent-resources`}>
                  📚 Parent Resources
                </Button>
              </Section>
            </Section>

            <Hr style={dividerStyle} />

            {/* 🎉 Final Welcome Message */}
            <Section style={finalMessageStyle}>
              <Text style={finalMessageTextStyle}>
                Welcome to the Great Beginnings family! We're honored that you've 
                chosen us to care for {childName}, and we promise to make every 
                day filled with learning, laughter, and love. 
              </Text>
              
              <Text style={finalMessageTextStyle}>
                Here's to new beginnings and wonderful adventures ahead! 🌟
              </Text>
              
              <Text style={signatureStyle}>
                With excitement and warm regards,<br />
                <strong>The Great Beginnings Team</strong> 💙
              </Text>
            </Section>
          </Section>

          {/* 🏢 Footer */}
          <Section style={footerStyle}>
            <Text style={footerTextStyle}>
              This welcome email was sent to prepare you for {childName}'s first day 
              on {formatEmailDate(startDate)}. We can't wait to meet you both! 🌈
            </Text>
            
            <Text style={footerSmallStyle}>
              If you need to make any changes to your start date or have questions, 
              please contact us immediately at {EMAIL_CONFIG.business.phone}.
            </Text>
          </Section>
          
        </Container>
      </Body>
    </Html>
  )
}

/**
 * 🎨 Beautiful Email Styles
 * Making our welcome email as warm and inviting as our daycare!
 */

const bodyStyle = {
  backgroundColor: '#FEF7F0', // Warm, welcoming background
  margin: '0',
  padding: '20px',
  fontFamily: EMAIL_STYLES.fonts.body
}

const containerStyle = {
  backgroundColor: EMAIL_STYLES.colors.white,
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
  maxWidth: '650px',
  margin: '0 auto'
}

const headerStyle = {
  background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
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
  fontSize: '16px',
  margin: '0',
  opacity: '0.95',
  textAlign: 'center' as const,
  fontWeight: '500'
}

const contentStyle = {
  padding: `${EMAIL_STYLES.spacing.xl} ${EMAIL_STYLES.spacing.lg}`
}

const welcomeBannerStyle = {
  backgroundColor: 'linear-gradient(135deg, #FEF3C7 0%, #FED7AA 100%)',
  background: '#FEF3C7',
  border: '3px solid #F59E0B',
  borderRadius: '12px',
  padding: EMAIL_STYLES.spacing.lg,
  textAlign: 'center' as const,
  margin: '0 0 32px 0'
}

const welcomeHeadingStyle = {
  color: '#D97706',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0 0 12px 0',
  textAlign: 'center' as const
}

const welcomeTextStyle = {
  color: '#92400E',
  fontSize: '18px',
  fontWeight: '500',
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

const infoBoxStyle = {
  backgroundColor: '#EBF8FF',
  border: `3px solid ${EMAIL_STYLES.colors.primary}`,
  borderRadius: '12px',
  padding: EMAIL_STYLES.spacing.lg,
  margin: '32px 0'
}

const infoHeadingStyle = {
  color: EMAIL_STYLES.colors.primary,
  fontSize: '22px',
  fontWeight: '600',
  margin: '0 0 20px 0',
  textAlign: 'center' as const
}

const detailRowStyle = {
  marginBottom: EMAIL_STYLES.spacing.md,
  display: 'flex',
  alignItems: 'center'
}

const iconColumnStyle = {
  width: '8%'
}

const labelColumnStyle = {
  width: '35%'
}

const valueColumnStyle = {
  width: '57%'
}

const iconStyle = {
  fontSize: '18px',
  margin: '0'
}

const labelStyle = {
  color: EMAIL_STYLES.colors.lightText,
  fontSize: '14px',
  fontWeight: '600',
  margin: '0'
}

const valueStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '14px',
  fontWeight: '500',
  margin: '0'
}

const highlightValueStyle = {
  color: EMAIL_STYLES.colors.primary,
  fontSize: '15px',
  fontWeight: '700',
  margin: '0'
}

const checklistSectionStyle = {
  margin: '32px 0'
}

const checklistHeadingStyle = {
  color: EMAIL_STYLES.colors.secondary,
  fontSize: '22px',
  fontWeight: '600',
  margin: '0 0 16px 0'
}

const checklistStyle = {
  backgroundColor: '#F0FDF4',
  border: `2px solid ${EMAIL_STYLES.colors.secondary}`,
  borderRadius: '10px',
  padding: EMAIL_STYLES.spacing.lg,
  margin: '20px 0'
}

const checklistItemStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 10px 0',
  paddingLeft: '4px'
}

const tipStyle = {
  backgroundColor: '#FFFBEB',
  border: '2px solid #F59E0B',
  borderRadius: '8px',
  padding: EMAIL_STYLES.spacing.md,
  color: '#D97706',
  fontSize: '14px',
  margin: '16px 0 0 0',
  textAlign: 'center' as const
}

const expectationsSectionStyle = {
  margin: '32px 0'
}

const expectationsHeadingStyle = {
  color: EMAIL_STYLES.colors.accent,
  fontSize: '22px',
  fontWeight: '600',
  margin: '0 0 20px 0'
}

const expectationsGridStyle = {
  margin: '20px 0'
}

const expectationRowStyle = {
  marginBottom: EMAIL_STYLES.spacing.lg
}

const expectationColumnStyle = {
  width: '50%',
  padding: `0 ${EMAIL_STYLES.spacing.sm}`,
  textAlign: 'center' as const
}

const expectationIconStyle = {
  fontSize: '32px',
  margin: '0 0 8px 0',
  textAlign: 'center' as const,
  display: 'block'
}

const expectationTitleStyle = {
  color: EMAIL_STYLES.colors.text,
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 8px 0',
  textAlign: 'center' as const
}

const expectationTextStyle = {
  color: EMAIL_STYLES.colors.lightText,
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0',
  textAlign: 'center' as const
}

const specialMessageStyle = {
  backgroundColor: '#FDF2F8',
  border: '3px solid #EC4899',
  borderRadius: '12px',
  padding: EMAIL_STYLES.spacing.lg,
  margin: '32px 0',
  textAlign: 'center' as const
}

const specialMessageHeadingStyle = {
  color: '#BE185D',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 16px 0'
}

const childMessageStyle = {
  color: '#BE185D',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0',
  fontStyle: 'italic',
  fontWeight: '500'
}

const contactBoxStyle = {
  backgroundColor: EMAIL_STYLES.colors.background,
  border: `2px solid ${EMAIL_STYLES.colors.lightText}`,
  borderRadius: '10px',
  padding: EMAIL_STYLES.spacing.lg,
  margin: '32px 0'
}

const contactHeadingStyle = {
  color: EMAIL_STYLES.colors.text,
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

const buttonSectionStyle = {
  textAlign: 'center' as const,
  margin: '24px 0'
}

const primaryButtonStyle = {
  backgroundColor: EMAIL_STYLES.colors.primary,
  color: EMAIL_STYLES.colors.white,
  borderRadius: '10px',
  padding: '14px 28px',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  display: 'inline-block'
}

const dividerStyle = {
  border: 'none',
  borderTop: `2px solid ${EMAIL_STYLES.colors.lightText}`,
  margin: '40px 0',
  opacity: '0.3'
}

const finalMessageStyle = {
  textAlign: 'center' as const,
  margin: '32px 0'
}

const finalMessageTextStyle = {
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