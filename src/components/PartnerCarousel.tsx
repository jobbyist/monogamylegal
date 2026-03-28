import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const partners = [
  { name: "Partner 1", id: 1 },
  { name: "Partner 2", id: 2 },
  { name: "Partner 3", id: 3 },
  { name: "Partner 4", id: 4 },
  { name: "Partner 5", id: 5 },
  { name: "Partner 6", id: 6 },
  { name: "Partner 7", id: 7 },
  { name: "Partner 8", id: 8 },
  { name: "Partner 9", id: 9 },
  { name: "Partner 10", id: 10 },
];

const PartnerCarousel = () => {
  const autoplayPlugin = Autoplay({ delay: 5000, stopOnInteraction: false });

  return (
    <div className="w-full max-w-[110rem] mx-auto">
      <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4 text-center">
        Our Partners
      </p>
      <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold text-center mb-12">
        Powered by the world's leading technology providers
      </h2>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[autoplayPlugin]}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {partners.map((partner) => (
            <CarouselItem key={partner.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
              <div className="p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all flex items-center justify-center bg-muted/50">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-[2rem] font-bold text-primary">{partner.id}</span>
                  </div>
                  <p className="text-[1.4rem] font-semibold text-foreground">{partner.name}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default PartnerCarousel;
