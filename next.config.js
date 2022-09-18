/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  env: {
    HOME_URI: 'http://localhost:3000',
    NEXTAUTH_URL: 'http://localhost:3000',
    MONGO_URI: "mongodb://localhost:27017/manage_io?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
    JWT_SECRECT_KEY: "GH@nTaB@lEnwAre!n$tItUtE",
    NEXT_AUTH_SECRET: "KVpTIYEZgNUhMHo355BegYylX+tAY520yYc5YBAChts=",
    SMTP_GMAIL_ID: "info.manage.io@gmail.com",
    SMTP_GMAIL_PASS: "bvnsvoawnparwhxw"
  }
}