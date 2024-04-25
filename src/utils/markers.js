const markers = [
  {
    age: '18-23',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Chicago',
    coordinates: [-87.68, 41.84]
  },
  {
    age: '24-40',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Houston',
    coordinates: [-95.39, 29.77]
  },
  {
    age: '35-50',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Philadelphia',
    coordinates: [-75.13, 40.01]
  },
  { age: '18-23', gender: 'Female', group: 'Perfume lover', city: 'Phoenix', coordinates: [-112.07, 33.54] },
  {
    age: '24-40',
    gender: 'Male',
    group: 'Beauty products connaisseur',
    city: 'San diego',
    coordinates: [-117.14, 32.81]
  },
  { age: '35-50', gender: 'Male', group: 'Perfume lover', city: 'San antonio', coordinates: [-98.51, 29.46] },
  {
    age: '24-40',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Dallas',
    coordinates: [-96.77, 32.79]
  },
  {
    age: '35-50',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Detroit',
    coordinates: [-83.1, 42.38]
  },
  {
    age: '18-23',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'San jose',
    coordinates: [-121.85, 37.3]
  },
  {
    age: '24-40',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Jacksonville',
    coordinates: [-81.66, 30.33]
  },
  { age: '24-40', gender: 'Male', group: 'Perfume lover', city: 'Indianapolis', coordinates: [-86.15, 39.78] },
  {
    age: '35-50',
    gender: 'Male',
    group: 'Dermocosmetics enthusiast',
    city: 'San francisco',
    coordinates: [-122.45, 37.77]
  },
  {
    age: '18-23',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Columbus',
    coordinates: [-82.99, 39.99]
  },
  { age: '24-40', gender: 'Female', group: 'Perfume lover', city: 'Austin', coordinates: [-97.75, 30.31] },
  {
    age: '35-50',
    gender: 'Female',
    group: 'Dermocosmetics enthusiast',
    city: 'Memphis',
    coordinates: [-90.01, 35.11]
  },
  {
    age: '18-23',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Baltimore',
    coordinates: [-76.61, 39.3]
  },
  {
    age: '24-40',
    gender: 'Male',
    group: 'Beauty products connaisseur',
    city: 'Fort worth',
    coordinates: [-97.34, 32.75]
  },
  {
    age: '35-50',
    gender: 'Male',
    group: 'Beauty products connaisseur',
    city: 'El paso',
    coordinates: [-106.44, 31.85]
  },
  { age: '24-40', gender: 'Male', group: 'Perfume lover', city: 'Charlotte', coordinates: [-80.83, 35.2] },
  {
    age: '35-50',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Milwaukee',
    coordinates: [-87.97, 43.06]
  },
  { age: '18-23', gender: 'Female', group: 'Perfume lover', city: 'Boston', coordinates: [-71.02, 42.34] },
  {
    age: '24-40',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Tokyo',
    coordinates: [139.77, 35.67]
  },
  {
    age: '35-50',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Yokohama',
    coordinates: [139.62, 35.47]
  },
  {
    age: '18-23',
    gender: 'Male',
    group: 'Beauty products connaisseur',
    city: 'Osaka',
    coordinates: [135.5, 34.68]
  },
  {
    age: '24-40',
    gender: 'Male',
    group: 'Beauty products connaisseur',
    city: 'Nagoya',
    coordinates: [136.91, 35.15]
  },
  { age: '35-50', gender: 'Female', group: 'Perfume lover', city: 'Sapporo', coordinates: [141.34, 43.06] },
  {
    age: '24-40',
    gender: 'Female',
    group: 'Dermocosmetics enthusiast',
    city: 'Kobe',
    coordinates: [135.17, 34.68]
  },
  {
    age: '35-50',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Kyoto',
    coordinates: [135.75, 35.01]
  },
  { age: '18-23', gender: 'Female', group: 'Perfume lover', city: 'Fukuoka', coordinates: [130.41, 33.59] },
  {
    age: '24-40',
    gender: 'Male',
    group: 'Beauty products connaisseur',
    city: 'Kawasaki',
    coordinates: [139.7, 35.53]
  },
  {
    age: '35-50',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Hiroshima',
    coordinates: [132.44, 34.39]
  },
  {
    age: '18-23',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Sendai',
    coordinates: [140.89, 38.26]
  },
  { age: '24-40', gender: 'Female', group: 'Perfume lover', city: 'Kitakyushu', coordinates: [130.86, 33.88] },
  {
    age: '35-50',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Chiba',
    coordinates: [140.11, 35.61]
  },
  {
    age: '24-40',
    gender: 'Male',
    group: 'Perfume lover',
    city: 'Thanh pho ho chi minh',
    coordinates: [106.69, 10.78]
  },
  {
    age: '35-50',
    gender: 'Male',
    group: 'Beauty products connaisseur',
    city: 'Ha noi',
    coordinates: [105.84, 21.03]
  },
  {
    age: '18-23',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Hai phong',
    coordinates: [106.68, 20.86]
  },
  {
    age: '24-40',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Da nang',
    coordinates: [108.21, 16.07]
  },
  {
    age: '35-50',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Bien hoa',
    coordinates: [106.82, 10.95]
  },
  { age: '18-23', gender: 'Female', group: 'Perfume lover', city: 'Hue', coordinates: [107.58, 16.48] },
  {
    age: '24-40',
    gender: 'Male',
    group: 'Dermocosmetics enthusiast',
    city: 'Nha trang',
    coordinates: [109.19, 12.25]
  },
  {
    age: '35-50',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Can tho',
    coordinates: [105.78, 10.03]
  },
  { age: '24-40', gender: 'Female', group: 'Perfume lover', city: 'Rach gia', coordinates: [105.08, 10.02] },
  {
    age: '35-50',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Qui nhon',
    coordinates: [109.24, 13.77]
  },
  {
    age: '18-23',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Vung tau',
    coordinates: [107.08, 10.35]
  },
  {
    age: '24-40',
    gender: 'Male',
    group: 'Beauty products connaisseur',
    city: 'Nam dinh',
    coordinates: [106.17, 20.43]
  },
  { age: '35-50', gender: 'Male', group: 'Perfume lover', city: 'Long xuyen', coordinates: [105.43, 10.39] },
  {
    age: '18-23',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Cam pha',
    coordinates: [107.29, 21.02]
  },
  { age: '24-40', gender: 'Female', group: 'Perfume lover', city: 'Sao paulo', coordinates: [-46.63, -23.53] },
  {
    age: '35-50',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Rio de janeiro',
    coordinates: [-43.2, -22.91]
  },
  {
    age: '24-40',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Salvador',
    coordinates: [-38.5, -12.97]
  },
  {
    age: '35-50',
    gender: 'Male',
    group: 'Beauty products connaisseur',
    city: 'Belo horizonte',
    coordinates: [-43.94, -19.92]
  },
  {
    age: '18-23',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Fortaleza',
    coordinates: [-38.59, -3.78]
  },
  { age: '24-40', gender: 'Female', group: 'Perfume lover', city: 'Brasilia', coordinates: [-47.91, -15.78] },
  {
    age: '35-50',
    gender: 'Female',
    group: 'Dermocosmetics enthusiast',
    city: 'Curitiba',
    coordinates: [-49.29, -25.42]
  },
  {
    age: '18-23',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Manaus',
    coordinates: [-60.02, -3.12]
  },
  { age: '24-40', gender: 'Male', group: 'Perfume lover', city: 'Recife', coordinates: [-34.92, -8.08] },
  {
    age: '35-50',
    gender: 'Male',
    group: 'Beauty products connaisseur',
    city: 'Belem',
    coordinates: [-48.5, -1.44]
  },
  {
    age: '24-40',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Jakarta',
    coordinates: [106.83, -6.18]
  },
  {
    age: '35-50',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Surabaya',
    coordinates: [112.74, -7.24]
  },
  { age: '18-23', gender: 'Female', group: 'Perfume lover', city: 'Bandung', coordinates: [107.6, -6.91] },
  {
    age: '24-40',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Medan',
    coordinates: [98.67, 3.59]
  },
  { age: '35-50', gender: 'Male', group: 'Perfume lover', city: 'Palembang', coordinates: [104.75, -2.99] },
  {
    age: '18-23',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Tangerang',
    coordinates: [106.63, -6.18]
  },
  {
    age: '24-40',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Semarang',
    coordinates: [110.42, -6.97]
  },
  {
    age: '35-50',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Makasar',
    coordinates: [119.41, -5.14]
  },
  {
    age: '24-40',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Malang',
    coordinates: [112.62, -7.98]
  },
  { age: '35-50', gender: 'Male', group: 'Perfume lover', city: 'Bekasi', coordinates: [106.97, -6.22] },
  {
    age: '18-23',
    gender: 'Male',
    group: 'Dermocosmetics enthusiast',
    city: 'London',
    coordinates: [-0.1, 51.52]
  },
  {
    age: '24-40',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Glasgow',
    coordinates: [-4.27, 55.87]
  },
  { age: '35-50', gender: 'Female', group: 'Perfume lover', city: 'Birmingham', coordinates: [-1.91, 52.48] },
  {
    age: '18-23',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Liverpool',
    coordinates: [-2.99, 53.42]
  },
  {
    age: '24-40',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Edinburgh',
    coordinates: [-3.22, 55.95]
  },
  {
    age: '35-50',
    gender: 'Male',
    group: 'Beauty products connaisseur',
    city: 'Sheffield',
    coordinates: [-1.48, 53.39]
  },
  { age: '24-40', gender: 'Female', group: 'Perfume lover', city: 'Leeds', coordinates: [-1.55, 53.81] },
  {
    age: '35-50',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Bristol',
    coordinates: [-2.6, 51.46]
  },
  { age: '18-23', gender: 'Female', group: 'Perfume lover', city: 'Manchester', coordinates: [-2.25, 53.48] },
  {
    age: '24-40',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Leicester',
    coordinates: [-1.13, 52.64]
  },
  {
    age: '18-23',
    gender: 'Male',
    group: 'Beauty products connaisseur',
    city: 'Paris',
    coordinates: [2.34, 48.86]
  },
  {
    age: '24-40',
    gender: 'Male',
    group: 'Beauty products connaisseur',
    city: 'Marseille',
    coordinates: [5.37, 43.31]
  },
  {
    age: '35-50',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Lyon',
    coordinates: [4.83, 45.76]
  },
  { age: '18-23', gender: 'Female', group: 'Perfume lover', city: 'Toulouse', coordinates: [1.45, 43.62] },
  { age: '24-40', gender: 'Female', group: 'Dermocosmetics enthusiast', city: 'Nice', coordinates: [7.27, 43.7] },
  {
    age: '35-50',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Nantes',
    coordinates: [-1.57, 47.23]
  },
  { age: '24-40', gender: 'Male', group: 'Perfume lover', city: 'Strasbourg', coordinates: [7.76, 48.58] },
  {
    age: '35-50',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Montpellier',
    coordinates: [3.87, 43.61]
  },
  {
    age: '18-23',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Bordeaux',
    coordinates: [-0.58, 44.84]
  },
  {
    age: '24-40',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Rennes',
    coordinates: [-1.68, 48.11]
  },
  { age: '35-50', gender: 'Female', group: 'Perfume lover', city: 'Ar-riyad?', coordinates: [46.77, 24.65] },
  {
    age: '18-23',
    gender: 'Male',
    group: 'Beauty products connaisseur',
    city: 'Jiddah',
    coordinates: [39.17, 21.5]
  },
  { age: '24-40', gender: 'Male', group: 'Perfume lover', city: 'Makkah', coordinates: [39.82, 21.43] },
  {
    age: '35-50',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Al-madinah',
    coordinates: [39.59, 24.48]
  },
  {
    age: '24-40',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Ad-dammam',
    coordinates: [50.1, 26.43]
  },
  {
    age: '35-50',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: "At-ta'if",
    coordinates: [40.38, 21.26]
  },
  {
    age: '18-23',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Tabuk',
    coordinates: [36.57, 28.39]
  },
  { age: '24-40', gender: 'Male', group: 'Perfume lover', city: 'Buraydah', coordinates: [43.97, 26.37] },
  {
    age: '18-23',
    gender: 'Female',
    group: 'Dermocosmetics enthusiast',
    city: 'Al-hufuf',
    coordinates: [49.58, 25.35]
  },
  {
    age: '24-40',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Al-mubarraz',
    coordinates: [49.57, 25.43]
  },
  {
    name: 'jsjj.hshsq',
    age: '25-34',
    gender: 'Female',
    group: 'Dermocosmetics enthusiast',
    city: 'New York',
    coordinates: [-74.006, 40.7128]
  },
  {
    name: 'xiaoyani6',
    age: '35+',
    gender: 'Female',
    group: 'Beauty products connaisseur',
    city: 'Los Angeles',
    coordinates: [-118.243, 34.052]
  },
  {
    name: 'shuaiwh',
    age: '35+',
    gender: 'Male',
    group: 'Perfume lover',
    city: 'Seattle',
    coordinates: [-122.332, 47.606]
  }
]
export default markers
