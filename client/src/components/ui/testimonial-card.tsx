import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AnimatedCard } from "./animated-card";

interface TestimonialCardProps {
  name: string;
  role: string;
  company?: string;
  content: string;
  rating?: number;
  image?: string;
  delay?: number;
}

export function TestimonialCard({
  name,
  role,
  company,
  content,
  rating = 5,
  image,
  delay = 0,
}: TestimonialCardProps) {
  return (
    <AnimatedCard delay={delay} className="p-6 relative">
      <CardContent className="p-0">
        {/* Quote icon */}
        <div className="absolute -top-2 -right-2 text-primary text-4xl opacity-20">
          <i className="fas fa-quote-right"></i>
        </div>

        {/* Rating stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.i
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: delay + i * 0.1 }}
              className={`fas fa-star text-lg ${
                i < rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Testimonial content */}
        <p className="text-gray-600 mb-6 leading-relaxed italic">
          "{content}"
        </p>

        {/* Client info */}
        <div className="flex items-center gap-4">
          {image ? (
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={image}
              alt={name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center">
              <i className="fas fa-user"></i>
            </div>
          )}
          <div>
            <h4 className="font-bold text-secondary">{name}</h4>
            <p className="text-sm text-gray-500">
              {role}
              {company && (
                <>
                  {" "}
                  - <span className="text-primary">{company}</span>
                </>
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </AnimatedCard>
  );
}