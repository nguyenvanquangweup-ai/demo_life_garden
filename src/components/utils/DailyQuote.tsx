import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const quotes = [
  { text: 'Sức khỏe là vàng, hãy chăm sóc nó như một kho báu.', author: 'Cuộc Sống' },
  { text: 'Mỗi ngày là một cơ hội mới để trở thành phiên bản tốt hơn của chính mình.', author: 'Tài Nguyên' },
  { text: 'Những bước nhỏ mỗi ngày tạo nên những thay đổi lớn.', author: 'Sự Kiên Trì' },
  { text: 'Hành động nhỏ, giá trị lớn. Bạn đang làm tuyệt vời!', author: 'Động Lực' },
  { text: 'Tình yêu bản thân là tình yêu sâu nhất. Hãy bắt đầu từ hôm nay.', author: 'Tự Yêu' },
  { text: 'Sức khỏe không phải điểm đến, mà là một cuộc hành trình.', author: 'Cuộc Phiêu Lưu' },
  { text: 'Bạn mạnh hơn bạn tưởng. Tiếp tục cố gắng!', author: 'Sự Mạnh Mẽ' },
  { text: 'Hôm nay là ngày tốt để chăm sóc bản thân.', author: 'Tự Chăm Sóc' },
  { text: 'Tiến bộ không phải hoàn hảo. Hãy tự hào về mỗi bước.', author: 'Tiến Bộ' },
  { text: 'Đầu tư vào sức khỏe của bạn là quyết định tốt nhất.', author: 'Đầu Tư' },
];

export function DailyQuote() {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const today = new Date().getDate();
    setQuote(quotes[today % quotes.length]);
  }, []);

  return (
    <motion.div
      className="bg-gradient-to-r from-lavender/40 to-peach/40 rounded-2xl p-5 border border-white/30 glass-effect"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <p className="text-sm text-gray-700 italic text-center mb-2">
        "{quote.text}"
      </p>
      <p className="text-xs text-gray-600 text-center font-medium">
        — {quote.author}
      </p>
    </motion.div>
  );
}
