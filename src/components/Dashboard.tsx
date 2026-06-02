import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useGardenContext } from '@/context/GardenContext';
import { DailyTaskPanel } from './tasks/DailyTaskPanel';
import { GlassCard } from './ui/GlassCard';
import { SingleTree } from './garden/SingleTree';
import { Confetti } from './gamification/Confetti';

const motivationalMessages = [
  { range: [0, 20], text: '🌱 Hạt giống chờ mọc! Hoàn thành thêm nhiệm vụ nữa!', color: 'from-yellow-100/50 to-green-100/50' },
  { range: [20, 40], text: '🌿 Cây đã mọc lá! Tiếp tục nỗ lực!', color: 'from-green-100/50 to-emerald-100/50' },
  { range: [40, 60], text: '🌳 Cây lớn rồi! Chỉ còn chút nữa thôi!', color: 'from-emerald-100/50 to-cyan-100/50' },
  { range: [60, 80], text: '🌸 Cây sắp nở hoa! Bạn gần thành công rồi!', color: 'from-pink-100/50 to-rose-100/50' },
  { range: [80, 100], text: '🌺 Hoa đã nở rồi! Hoàn thành ngay đi!', color: 'from-rose-100/50 to-red-100/50' },
  { range: [100, 101], text: '🌳 Vườn hoàn hảo! Bạn thực sự tuyệt vời!', color: 'from-yellow-100/50 to-orange-100/50' },
];

export function Dashboard() {
  const { tasks, completionPercent, gardenStage, xp, level, streak, healthMetrics } = useGardenContext();
  const [quote, setQuote] = useState('Sức khỏe là vàng, hãy chăm sóc nó như một kho báu.');

  const allTasksCompleted = completionPercent === 100;

  useEffect(() => {
    const quotes = [
      'Sức khỏe là vàng, hãy chăm sóc nó như một kho báu.',
      'Mỗi ngày là một cơ hội mới để trở thành phiên bản tốt hơn của chính mình.',
      'Những bước nhỏ mỗi ngày tạo nên những thay đổi lớn.',
      'Hành động nhỏ, giá trị lớn. Bạn đang làm tuyệt vời!',
      'Tình yêu bản thân là tình yêu sâu nhất.',
      'Sức khỏe không phải điểm đến, mà là một cuộc hành trình.',
      'Bạn mạnh hơn bạn tưởng. Tiếp tục cố gắng!',
      'Hôm nay là ngày tốt để chăm sóc bản thân.',
      'Tiến bộ không phải hoàn hảo. Hãy tự hào về mỗi bước.',
      'Đầu tư vào sức khỏe của bạn là quyết định tốt nhất.',
    ];
    const today = new Date().getDate();
    setQuote(quotes[today % quotes.length]);
  }, []);

  const getMotivationalMessage = () => {
    const msg = motivationalMessages.find(m => completionPercent >= m.range[0] && completionPercent < m.range[1]);
    return msg || motivationalMessages[0];
  };

  return (
    <div className="h-screen garden-bg p-4 relative overflow-hidden flex flex-col">
      {allTasksCompleted && <Confetti />}

      {/* Header */}
      <motion.div
        className="text-center mb-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-mint via-sky-garden to-lavender bg-clip-text text-transparent mb-1">
          🌿 Vườn Sống
        </h1>
        <p className="text-gray-600 text-sm">Chăm sóc cây của bạn, chăm sóc sức khỏe</p>
      </motion.div>

      {/* Main Grid - 3 Columns: Info + Tree + Tasks */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-[220px_1fr_320px] gap-4 flex-1 min-h-0"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2,
            },
          },
        }}
      >
        {/* LEFT - Info Panel */}
        <motion.div
          className="flex flex-col gap-3 h-full min-h-0 overflow-y-auto pr-1"
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          }}
        >
          {/* Header */}
          <div className="text-center mb-1">
            <p className="text-sm font-bold text-gray-800">Hôm Nay</p>
          </div>

          {/* Motivational Message - Large */}
          <GlassCard className={`p-3 bg-gradient-to-br ${getMotivationalMessage().color} border border-white/50 rounded-2xl`}>
            <p className="text-center text-sm font-bold text-gray-800 leading-snug">
              {getMotivationalMessage().text}
            </p>
          </GlassCard>

          {/* Main Stats - Large */}
          <GlassCard className="p-4 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-2xl">
            <div className="flex justify-around text-center gap-2">
              <div className="flex-1">
                <p className="text-2xl font-bold text-purple-600">Lv {level}</p>
                <p className="text-xs text-gray-600 font-medium">Cấp Độ</p>
              </div>
              <div className="w-px bg-white/40"></div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-orange-500">🔥 {streak}</p>
                <p className="text-xs text-gray-600 font-medium">Chuỗi</p>
              </div>
            </div>
          </GlassCard>

          {/* XP Progress - Full Width */}
          <GlassCard className="p-3 bg-gradient-to-br from-yellow-100/40 to-orange-100/40 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-orange-700">✨ Experience</p>
              <p className="text-xs font-bold text-orange-600">{xp} XP</p>
            </div>
            <div className="w-full h-3 bg-white/40 rounded-full overflow-hidden border border-white/50">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300"
                style={{ width: `${Math.min((xp % 100) / 100, 1) * 100}%` }}
              />
            </div>
          </GlassCard>

          {/* Health Summary */}
          {healthMetrics && (
            <GlassCard className="p-3 bg-gradient-to-br from-green-100/40 to-emerald-100/40 rounded-2xl">
              <p className="text-sm font-bold text-green-700 mb-2">💪 Sức Khỏe</p>
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-700">BMI</span>
                  <span className="text-sm font-bold text-gray-800">{healthMetrics.bmi}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-700">TDEE</span>
                  <span className="text-sm font-bold text-gray-800">{healthMetrics.tdee} kcal</span>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Progress Tracker */}
          <GlassCard className="p-3 bg-gradient-to-br from-pink-100/40 to-rose-100/40 rounded-2xl">
            <p className="text-sm font-bold text-pink-700 mb-2">📊 Tiến Độ</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-pink-600">{Math.round(completionPercent)}%</p>
                <p className="text-xs text-gray-600">Hoàn Thành</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-800">{tasks.filter((t) => t.completedAt).length}/{tasks.length}</p>
                <p className="text-xs text-gray-600">Nhiệm Vụ</p>
              </div>
            </div>
          </GlassCard>

          {/* Daily Quote */}
          <GlassCard className="p-3 bg-gradient-to-r from-lavender/40 to-peach/40 border border-white/40 rounded-2xl flex-1 min-h-0 flex flex-col justify-center">
            <p className="text-xs italic text-gray-700 text-center leading-snug">
              💡 "{quote}"
            </p>
          </GlassCard>
        </motion.div>

        {/* CENTER - Tree */}
        <motion.div
          className="flex items-center justify-center h-full"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
          }}
        >
          <GlassCard className="p-4 w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-50/40 to-orange-50/40 shadow-2xl">
            <SingleTree stage={gardenStage} tasks={tasks} completionPercent={completionPercent} />
          </GlassCard>
        </motion.div>

        {/* RIGHT - Tasks Panel */}
        <motion.div
          className="h-full min-h-0"
          variants={{
            hidden: { opacity: 0, x: 30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
          }}
        >
          <DailyTaskPanel />
        </motion.div>
      </motion.div>
    </div>
  );
}
