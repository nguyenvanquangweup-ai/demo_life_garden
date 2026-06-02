import { useGardenContext } from '@/context/GardenContext';
import { TaskCard } from './TaskCard';
import { XPBar } from '@/components/gamification/XPBar';
import { LevelBadge } from '@/components/gamification/LevelBadge';
import { StreakCounter } from '@/components/gamification/StreakCounter';
import { GlassCard } from '@/components/ui/GlassCard';

export function DailyTaskPanel() {
  const { tasks, taskDefs, completeTask, uncompleteTask, xp, level, streak, completionPercent } =
    useGardenContext();

  const today = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <GlassCard className="p-6 flex flex-col h-full space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">Hôm Nay - {today}</h2>
        <p className="text-xs text-gray-600">
          {Math.round(completionPercent)}% hoàn thành • {tasks.filter((t) => t.completedAt).length}/
          {tasks.length} nhiệm vụ
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {/* Nutrition Section */}
        <div>
          <h3 className="text-xs font-bold text-gray-600 mb-2 px-1">🥗 DINH DƯỠNG</h3>
          <div className="space-y-2">
            {taskDefs.filter(d => ['water', 'breakfast', 'lunch', 'dinner', 'vegetables'].includes(d.id)).map((def) => {
              const completion = tasks.find((t) => t.taskId === def.id);
              if (!completion) return null;
              return (
                <TaskCard
                  key={def.id}
                  definition={def}
                  completion={completion}
                  onToggle={() => {
                    if (completion.completedAt) {
                      uncompleteTask(def.id);
                    } else {
                      completeTask(def.id);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Exercise Section */}
        <div>
          <h3 className="text-xs font-bold text-gray-600 mb-2 px-1">💪 TẬP LUYỆN</h3>
          <div className="space-y-2">
            {taskDefs.filter(d => ['steps', 'cardio', 'strength', 'yoga', 'sports'].includes(d.id)).map((def) => {
              const completion = tasks.find((t) => t.taskId === def.id);
              if (!completion) return null;
              return (
                <TaskCard
                  key={def.id}
                  definition={def}
                  completion={completion}
                  onToggle={() => {
                    if (completion.completedAt) {
                      uncompleteTask(def.id);
                    } else {
                      completeTask(def.id);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Sleep Section */}
        <div>
          <h3 className="text-xs font-bold text-gray-600 mb-2 px-1">💤 GIẤC NGỦ</h3>
          <div className="space-y-2">
            {taskDefs.filter(d => ['sleep', 'earlybed', 'bedtime'].includes(d.id)).map((def) => {
              const completion = tasks.find((t) => t.taskId === def.id);
              if (!completion) return null;
              return (
                <TaskCard
                  key={def.id}
                  definition={def}
                  completion={completion}
                  onToggle={() => {
                    if (completion.completedAt) {
                      uncompleteTask(def.id);
                    } else {
                      completeTask(def.id);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Mindfulness Section */}
        <div>
          <h3 className="text-xs font-bold text-gray-600 mb-2 px-1">🧘 THÂM TRI & THƯ GIÃN</h3>
          <div className="space-y-2">
            {taskDefs.filter(d => ['meditate', 'breathe', 'journal'].includes(d.id)).map((def) => {
              const completion = tasks.find((t) => t.taskId === def.id);
              if (!completion) return null;
              return (
                <TaskCard
                  key={def.id}
                  definition={def}
                  completion={completion}
                  onToggle={() => {
                    if (completion.completedAt) {
                      uncompleteTask(def.id);
                    } else {
                      completeTask(def.id);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Wellness Section */}
        <div>
          <h3 className="text-xs font-bold text-gray-600 mb-2 px-1">🌍 XÃ HỘI & WELLNESS</h3>
          <div className="space-y-2">
            {taskDefs.filter(d => ['socialize', 'gratitude', 'hobby', 'learning'].includes(d.id)).map((def) => {
              const completion = tasks.find((t) => t.taskId === def.id);
              if (!completion) return null;
              return (
                <TaskCard
                  key={def.id}
                  definition={def}
                  completion={completion}
                  onToggle={() => {
                    if (completion.completedAt) {
                      uncompleteTask(def.id);
                    } else {
                      completeTask(def.id);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 pt-4 space-y-4">
        <XPBar xp={xp} level={level} />

        <div className="flex items-center justify-between">
          <StreakCounter streak={streak} />
          <LevelBadge level={level} />
        </div>
      </div>
    </GlassCard>
  );
}
