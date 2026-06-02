import { TaskDefinition } from '@/types';

export const TASK_DEFINITIONS: TaskDefinition[] = [
  // 🥗 Dinh dưỡng
  {
    id: 'water',
    label: 'Uống 2L Nước',
    description: 'Giữ cơ thể hydrat suốt ngày',
    xpReward: 10,
    plantType: 'blueFlower',
  },
  {
    id: 'breakfast',
    label: 'Ăn Sáng Lành Mạnh',
    description: 'Bắt đầu ngày với năng lượng',
    xpReward: 12,
    plantType: 'sunflower',
  },
  {
    id: 'lunch',
    label: 'Ăn Trưa Lành Mạnh',
    description: 'Bữa ăn chính cân bằng',
    xpReward: 12,
    plantType: 'sunflower',
  },
  {
    id: 'dinner',
    label: 'Ăn Tối Lành Mạnh',
    description: 'Kết thúc ngày với bữa ăn tốt',
    xpReward: 12,
    plantType: 'sunflower',
  },
  {
    id: 'vegetables',
    label: 'Ăn Rau & Hoa Quả',
    description: 'Ít nhất 2-3 phần rau/quả',
    xpReward: 15,
    plantType: 'meadowGrass',
  },

  // 💪 Tập Luyện
  {
    id: 'steps',
    label: 'Đi Bộ 8.000 Bước',
    description: 'Vận động hàng ngày',
    xpReward: 15,
    plantType: 'meadowGrass',
  },
  {
    id: 'cardio',
    label: 'Cardio 20 Phút',
    description: 'Chạy, nhảy dây, hoặc các hoạt động có nhịp độ',
    xpReward: 20,
    plantType: 'enduranceTree',
  },
  {
    id: 'strength',
    label: 'Tập Cơ / Weight',
    description: 'Tập với tạ hoặc bài tập cơ',
    xpReward: 20,
    plantType: 'enduranceTree',
  },
  {
    id: 'yoga',
    label: 'Yoga / Stretching',
    description: 'Linh hoạt và thư giãn cơ',
    xpReward: 15,
    plantType: 'meadowGrass',
  },
  {
    id: 'sports',
    label: 'Chơi Thể Thao',
    description: 'Bóng đá, bóng rổ, hoặc môn thể thao yêu thích',
    xpReward: 18,
    plantType: 'enduranceTree',
  },

  // 💤 Giấc Ngủ & Phục Hồi
  {
    id: 'sleep',
    label: 'Ngủ 7+ Giờ',
    description: 'Nghỉ ngơi đầy đủ',
    xpReward: 15,
    plantType: 'glowingMushroom',
  },
  {
    id: 'earlybed',
    label: 'Đi Ngủ Trước 11 PM',
    description: 'Chu kỳ giấc ngủ lành mạnh',
    xpReward: 12,
    plantType: 'glowingMushroom',
  },
  {
    id: 'bedtime',
    label: 'Không Điện Thoại Trước Ngủ',
    description: '30 phút trước khi ngủ',
    xpReward: 10,
    plantType: 'glowingMushroom',
  },

  // 🧘 Tâm Trí & Thư Giãn
  {
    id: 'meditate',
    label: 'Thiền 10 Phút',
    description: 'Calming & mindfulness',
    xpReward: 15,
    plantType: 'glowingMushroom',
  },
  {
    id: 'breathe',
    label: 'Deep Breathing 5 Phút',
    description: 'Thở sâu để giảm stress',
    xpReward: 10,
    plantType: 'blueFlower',
  },
  {
    id: 'journal',
    label: 'Viết Nhật Ký',
    description: 'Ghi lại cảm xúc & cảm thấy',
    xpReward: 12,
    plantType: 'meadowGrass',
  },

  // 🌍 Xã Hội & Wellness
  {
    id: 'socialize',
    label: 'Nói Chuyện Với Bạn Bè',
    description: 'Kết nối & cảm thấy vui vẻ',
    xpReward: 12,
    plantType: 'sunflower',
  },
  {
    id: 'gratitude',
    label: 'Tạ Ơn 3 Điều Tốt',
    description: 'Tăng sự biết ơn & tích cực',
    xpReward: 12,
    plantType: 'sunflower',
  },
  {
    id: 'hobby',
    label: 'Hoạt Động Yêu Thích',
    description: 'Đọc, vẽ, hoặc sở thích của bạn',
    xpReward: 15,
    plantType: 'meadowGrass',
  },
  {
    id: 'learning',
    label: 'Học Điều Mới',
    description: '30 phút học hoặc phát triển kỹ năng',
    xpReward: 15,
    plantType: 'enduranceTree',
  },
];

export function getTaskDefinition(taskId: string): TaskDefinition | undefined {
  return TASK_DEFINITIONS.find((d) => d.id === taskId);
}
