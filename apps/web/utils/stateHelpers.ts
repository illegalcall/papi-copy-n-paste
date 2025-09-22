
export function createStateClearer<T>(
  setState: React.Dispatch<React.SetStateAction<T>>,
  initialValue: T
) {
  return () => setState(initialValue);
}

