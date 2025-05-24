import { parseEmojiPoint, parsePoint } from "@/lib/summaryHelpers";
import React from "react";
import { MotionDiv } from "../common/MotionWrapper";
import { containerVariants, itemVariants } from "@/utils/constants";

const EmojiPoint = ({ point, index }: { point: string; index: number }) => {
  const { emoji, text } = parseEmojiPoint(point) ?? {};
  console.log(emoji, text);
  return (
    <MotionDiv variants={itemVariants}
      key={`point-${index}`}
      className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
    >
      <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <div className="relative flex items-start gap-3">
        <span className="text-lg lg:text-xl shrink-0 pt-1">{emoji}</span>
        <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
          {text}
        </p>
      </div>
    </MotionDiv>
  );
};

const RegularPoint = ({ point, index }: { point: string; index: number }) => {
  return (
    <MotionDiv variants={itemVariants}
      key={`point-${index}`}
      className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
    >
      <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
      <p className="relative text-lg lg:text-xl text-muted-foreground/90 leading-relaxed text-left">
        {point}
      </p>
    </MotionDiv>
  );
};

function ContentSection({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <MotionDiv variants={containerVariants} key={points.join("")} 
    initial="hidden" animate="visible" 
    exit="exit" className="space-y-4">
      {points.map((point, index) => {
        const { isNumbered, isMainPoint, hasEmoji, isEmpty } =
          parsePoint(point);

          console.log(isNumbered, isMainPoint, hasEmoji, isEmpty);
          
          if(isEmpty) return null;

        if (hasEmoji || isMainPoint) {
          return <EmojiPoint key={index} point={point} index={index} />;
        }
        return (
          <RegularPoint key={index} point={point} index={index}/>
        );
      })}
    </MotionDiv>
  );
}

export default ContentSection;
