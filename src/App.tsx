import { GardenContext } from '@/context/GardenContext';
import { useGarden } from '@/hooks/useGarden';
import { OnboardingForm } from '@/components/health/OnboardingForm';
import { Dashboard } from '@/components/Dashboard';
import { AchievementToast } from '@/components/gamification/AchievementToast';

function App() {
  const gardenContext = useGarden();

  if (!gardenContext.userProfile) {
    return (
      <OnboardingForm onComplete={gardenContext.setUserProfile} />
    );
  }

  return (
    <GardenContext.Provider value={gardenContext}>
      <Dashboard />
      <AchievementToast />
    </GardenContext.Provider>
  );
}

export default App;
