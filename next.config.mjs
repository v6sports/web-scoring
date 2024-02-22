import path from "path";

const __dirname = path.resolve();
/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],

  },
images:{
	domains:['https://projectasset.s3.ap-south-1.amazonaws.com/']
}
};

export default nextConfig;
