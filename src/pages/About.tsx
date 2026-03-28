import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import AppearOnScroll from "@/components/AppearOnScroll";
import { Shield, Scale, Users, Zap } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="box-content max-w-[64rem] px-4 md:px-[calc(18vw-10rem)] mx-auto relative mt-[4.5rem] xl:mt-[6rem]">
        <AppearOnScroll delay={0}>
          <h1 className="text-[3.4rem] md:text-[4.2rem] lg:text-[6rem] font-semibold tracking-[-0.01em] leading-[1.2] md:leading-[1] text-center">
            About Monogamy
          </h1>
        </AppearOnScroll>
      </div>

      <AppearOnScroll delay={0}>
        <figure className="relative flex overflow-hidden w-full mt-[3rem] md:mt-[4.5rem] lg:mt-[6rem] mb-[6rem] md:mb-[9rem] lg:mb-[12rem]">
          <picture className="flex w-full justify-center">
            <img
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=2000&q=80"
              alt="Legal professionals collaborating"
              className="top-0 left-0 max-w-full w-full aspect-[2/1] xl:aspect-[16/5] object-cover"
            />
          </picture>
        </figure>
      </AppearOnScroll>

      <div className="box-content max-w-[64rem] px-4 md:px-[calc(18vw-10rem)] mx-auto relative mb-[6rem] md:mb-[9rem] lg:mb-[12rem]">
        <AppearOnScroll delay={0}>
          <h2 className="text-[2.7rem] md:text-[3.6rem] font-semibold mb-[3rem]">Our Mission</h2>
        </AppearOnScroll>
        <AppearOnScroll delay={150}>
          <p className="text-[1.8rem] leading-[1.8] text-foreground mb-6">
            Monogamy was founded on a simple belief: everyone deserves access to quality legal representation, regardless of their budget. Traditional legal services are prohibitively expensive, creating a justice gap that leaves millions without adequate representation.
          </p>
        </AppearOnScroll>
        <AppearOnScroll delay={300}>
          <p className="text-[1.8rem] leading-[1.8] text-foreground mb-6">
            We've built a platform that connects individuals and businesses with a curated network of top-rated attorneys across every practice area — from family law and estate planning to business formation and criminal defense.
          </p>
        </AppearOnScroll>
        <AppearOnScroll delay={450}>
          <p className="text-[1.8rem] leading-[1.8] text-foreground">
            For attorneys and law firms, Monogamy provides a steady stream of qualified clients and the digital infrastructure to manage cases efficiently, reducing overhead while growing their practice.
          </p>
        </AppearOnScroll>
      </div>

      <div className="box-content max-w-[64rem] px-4 md:px-[calc(18vw-10rem)] mx-auto relative mb-[6rem] md:mb-[9rem] lg:mb-[12rem]">
        <AppearOnScroll delay={0}>
          <figure className="text-center mt-[1.25rem] mb-[0.9375rem] md:mt-[1.875rem] md:mb-[1.875rem] lg:mt-[3.75rem] lg:mb-[3.75rem] md:mx-[calc(-18vw+6.875rem)] xl:mx-[-12.5rem]">
            <blockquote className="font-sans text-[calc(5vw+0.6rem)] lg:text-[5.4rem] font-extrabold leading-[1.2]">
              "To democratize access to justice through technology and community."
            </blockquote>
            <figcaption className="text-[calc(2.5vw+0.8rem)] lg:text-[3rem] font-semibold leading-[1.6] md:leading-[1.4] before:content-['―_']">
              Our Vision
            </figcaption>
          </figure>
        </AppearOnScroll>
      </div>

      <Section>
        <div className="max-w-[110rem] mx-auto">
          <AppearOnScroll delay={0}>
            <h2 className="text-[2.7rem] md:text-[3.6rem] font-semibold mb-[4rem]">Our Values</h2>
          </AppearOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AppearOnScroll delay={0}>
              <div className="lg:col-span-1 p-8 rounded-2xl bg-primary/5 border border-primary/10">
                <Shield className="w-[48px] h-[48px] text-primary mb-4" />
                <h3 className="text-[2.2rem] font-semibold mb-3">Trust & Integrity</h3>
                <p className="text-[1.6rem] leading-[1.8] text-muted-foreground">
                  Every attorney in our network is thoroughly vetted. We uphold the highest ethical standards.
                </p>
              </div>
            </AppearOnScroll>
            <AppearOnScroll delay={150}>
              <div className="lg:col-span-2 p-8 rounded-2xl bg-primary/5 border border-primary/10">
                <Scale className="w-[48px] h-[48px] text-primary mb-4" />
                <h3 className="text-[2.2rem] font-semibold mb-3">Equal Access</h3>
                <p className="text-[1.6rem] leading-[1.8] text-muted-foreground">
                  Justice shouldn't be a luxury. Our subscription model makes quality legal counsel affordable and accessible to everyone.
                </p>
              </div>
            </AppearOnScroll>
            <AppearOnScroll delay={300}>
              <div className="lg:col-span-2 p-8 rounded-2xl bg-primary/5 border border-primary/10">
                <Users className="w-[48px] h-[48px] text-primary mb-4" />
                <h3 className="text-[2.2rem] font-semibold mb-3">Community</h3>
                <p className="text-[1.6rem] leading-[1.8] text-muted-foreground">
                  We foster meaningful attorney-client relationships built on mutual respect and shared goals.
                </p>
              </div>
            </AppearOnScroll>
            <AppearOnScroll delay={450}>
              <div className="lg:col-span-1 p-8 rounded-2xl bg-primary/5 border border-primary/10">
                <Zap className="w-[48px] h-[48px] text-primary mb-4" />
                <h3 className="text-[2.2rem] font-semibold mb-3">Innovation</h3>
                <p className="text-[1.6rem] leading-[1.8] text-muted-foreground">
                  We leverage technology to streamline legal workflows and create seamless experiences.
                </p>
              </div>
            </AppearOnScroll>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default About;
