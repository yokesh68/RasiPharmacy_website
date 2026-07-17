/**
 * Detects the user's current GPS location and returns a geocoded address.
 * Falls back to raw coordinates if reverse geocoding fails.
 */
export const detectGeoLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error('Geolocation is not supported by your browser.'));
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            {
              headers: {
                'Accept-Language': 'en'
              }
            }
          );
          
          if (response.ok) {
            const data = await response.json();
            resolve({
              address: data.display_name || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
              latitude,
              longitude
            });
          } else {
            throw new Error('Reverse geocoding failed');
          }
        } catch (error) {
          // Fallback to raw coordinates if geocoding service is unavailable
          resolve({
            address: `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)} (Precise GPS coordinates detected)`,
            latitude,
            longitude
          });
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
};
