module.exports = {
<<<<<<< HEAD
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      '@babel/plugin-transform-private-methods',
      {
        loose: true, // Tùy chọn này giúp tối ưu hóa kích thước file khi build
      },
    ],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true, // Bắt buộc sử dụng 'legacy' mode cho decorators
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true, // Cho phép hỗ trợ class properties
      },
    ],
  ],
=======
  presets: ['module:@react-native/babel-preset'],
>>>>>>> b19083247395aec8135ea41e63760732b49f483b
};
