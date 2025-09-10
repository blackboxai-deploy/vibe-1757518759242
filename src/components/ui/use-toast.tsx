// Simple toast implementation
export const toast = {
  success: (message: string) => {
    console.log('Success:', message);
    alert(`✅ ${message}`);
  },
  error: (message: string) => {
    console.log('Error:', message);
    alert(`❌ ${message}`);
  }
};