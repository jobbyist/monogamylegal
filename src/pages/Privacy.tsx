import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArticleContent } from "@/components/ArticleComponents";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="box-content max-w-[80rem] px-6 md:px-[calc(18vw-10rem)] mx-auto mt-[4rem] mb-[8rem]">
        <header className="mb-[4rem] text-center">
          <h1 className="text-[3.4rem] md:text-[4.2rem] lg:text-[5rem] font-semibold tracking-[-0.01em] leading-[1.2] mb-[1rem]">
            Privacy Policy
          </h1>
          <p className="text-[1.6rem] text-muted-foreground">
            Last updated: March 28, 2026
          </p>
        </header>

        <ArticleContent>
          <p>
            At Monogamy, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you visit our website and use our legal services platform. Monogamy currently operates in South Africa, Nigeria, and Kenya, and complies with applicable data protection legislation in each jurisdiction, including the Protection of Personal Information Act (POPIA) in South Africa, the Nigeria Data Protection Act (NDPA), and the Data Protection Act 2019 in Kenya.
          </p>

          <h2>Information We Collect</h2>

          <h3>Personal Information</h3>
          <p>
            We may collect personal information that you voluntarily provide to
            us when you:
          </p>
          <ul>
            <li>Subscribe to our newsletter or podcast updates</li>
            <li>Submit content or contact us through forms</li>
            <li>Create an account or purchase a subscription on our platform</li>
            <li>Participate in surveys or promotions</li>
            <li>Use The Monologue podcast streaming service</li>
          </ul>
          <p>
            This information may include your name, email address, country of residence, billing information, and any other information you choose to provide.
          </p>

          <h3>Automatically Collected Information</h3>
          <p>
            When you visit our website, we automatically collect certain
            information about your device, including:
          </p>
          <ul>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>IP address and approximate location (country/region)</li>
            <li>Pages visited and time spent on pages</li>
            <li>Audio content played and engagement metrics</li>
            <li>Referring website addresses</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process subscription payments and manage your account</li>
            <li>Match you with suitable attorneys in your jurisdiction (South Africa, Nigeria, or Kenya)</li>
            <li>Send you newsletters and updates (with your consent)</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Analyze usage patterns and trends</li>
            <li>Detect, prevent, and address technical issues</li>
            <li>Comply with legal obligations in applicable jurisdictions</li>
          </ul>

          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity
            on our website and store certain information, including podcast playback preferences and listening progress. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
            sent. However, if you do not accept cookies, you may not be able to
            use some portions of our website.
          </p>

          <h3>Types of Cookies We Use</h3>
          <ul>
            <li>
              <strong>Essential Cookies:</strong> Required for the website to
              function properly
            </li>
            <li>
              <strong>Analytics Cookies:</strong> Help us understand how
              visitors interact with our website
            </li>
            <li>
              <strong>Preference Cookies:</strong> Remember your settings, playback preferences, and country/currency selection
            </li>
          </ul>

          <h2>Third-Party Services</h2>
          <p>
            We may use third-party service providers (including Formspree for contact form processing, and payment processors for subscription billing) to help us operate our
            website and conduct our business. These third parties have access to
            your personal information only to perform specific tasks on our
            behalf and are obligated not to disclose or use it for any other
            purpose.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information consistent with applicable data protection laws in South Africa, Nigeria, and Kenya. However, please note that no
            method of transmission over the internet or electronic storage is
            100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the following rights under applicable data protection law (including POPIA, NDPA, and the Kenya Data Protection Act 2019):</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate or incomplete information</li>
            <li>Request deletion of your personal information</li>
            <li>Object to processing of your personal information</li>
            <li>Request restriction of processing</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>

          <h2>Children's Privacy</h2>
          <p>
            Our website is not intended for children under 18 years of age. We
            do not knowingly collect personal information from minors. If you are a parent or guardian and believe your child has
            provided us with personal information, please contact us.
          </p>

          <h2>International Data Transfers</h2>
          <p>
            Your information may be transferred to and maintained on servers
            located outside of your country. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with applicable data protection laws.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date. You are advised to review this
            Privacy Policy periodically for any changes.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or wish to exercise your data protection rights, please contact us:
          </p>
          <ul>
            <li>By email: <a href="mailto:hello@monogamy.law">hello@monogamy.law</a></li>
            <li>Through our contact page: <a href="/contact">/contact</a></li>
          </ul>
        </ArticleContent>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
