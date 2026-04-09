import { motion } from "framer-motion";
import { Share2 } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  score?: number;
}

const ShareButtons = ({ url, score }: ShareButtonsProps) => {
  const text = score
    ? `🔥 My website ${url} scored ${score}/100 on Cartory Roastify AI! Get your website roasted:`
    : `🔥 I just got my website roasted by Cartory Roastify AI! Check it out:`;

  const shareUrl = "https://roastify-ai.lovable.app";

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <div className="flex items-center gap-2">
      <Share2 className="h-4 w-4 text-muted-foreground" />
      <motion.button
        onClick={shareTwitter}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="rounded-lg glass-surface px-4 py-2 text-xs font-semibold text-foreground hover:text-flame-orange transition-colors"
      >
        𝕏 Twitter
      </motion.button>
      <motion.button
        onClick={shareFacebook}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="rounded-lg glass-surface px-4 py-2 text-xs font-semibold text-foreground hover:text-flame-orange transition-colors"
      >
        Facebook
      </motion.button>
    </div>
  );
};

export default ShareButtons;
