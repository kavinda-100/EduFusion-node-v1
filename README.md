# EDUFusion

## Live Demo
- [EduFusion](https://chief-friederike-technk-12177a0b.koyeb.app/)

## Contributors

<a href="https://github.com/kavinda-100">

  <img src="https://avatars.githubusercontent.com/u/152590601?s=64&v=4" width="64" height="64" alt="kavinda-100" style="border-radius: 50%;" />

</a>

<a href="https://github.com/ChaminduGayanuka-OUSL">

  <img src="https://avatars.githubusercontent.com/u/172014849?s=64&v=4" width="64" height="64" alt="CharmingGayane" style="border-radius: 50%;" />

</a>

<a href="https://github.com/sandunMadhushan">

  <img src="https://avatars.githubusercontent.com/u/69344147?s=64&v=4" width="64" height="64" alt="sandShushan" style="border-radius: 50%;" />

</a>

<a href="https://github.com/dilwan-thennakoon">

  <img src="https://avatars.githubusercontent.com/u/172015341?v=4" width="64" height="64" alt="sandShushan" style="border-radius: 50%;" />

</a>



## Technologies
![1](https://img.shields.io/badge/v1.1-Bun.sh-gray?style=flat)
![2](https://img.shields.io/badge/v4.19-Express.js-green?style=flat)
![3](https://img.shields.io/badge/v7-MongoDB-Evergreen?style=flat)
![4](https://img.shields.io/badge/v8.7-Mongoose-red?style=flat)
![5](https://img.shields.io/badge/v5-Vite-yellow?style=flat)
![6](https://img.shields.io/badge/v18-React-blue?style=flat)
![7](https://img.shields.io/badge/v3.4-TailwindCss-blue?style=flat)

## Description
The Student Management System (SMS) is designed to address the inefficiencies of traditional student information management
methods. By integrating various operations into a unified platform, “EduFusion” aims to enhance data precision,
accessibility, and decision-making capabilities.
The system will streamline administrative tasks such as student registration, attendance tracking,
and grade management, providing real-time data access and facilitating effective communication.
This will reduce the administrative burden, support data-informed decision-making, and lead to a more efficient
academic environment.

## API Documentation Link
- [API Documentation](https://documenter.getpostman.com/view/29134650/2sAYHxojVL)

## installation
1. Clone the repository
```bash
    git clone https://github.com/kavinda-100/EduFusion-node-v1.git
```

2. Install the required packages using the following command: 
```bash
    npm install
```

```bash
    cd frontend
    npm install
```

3. Run the application using the following command:
  ```bash
    npm run dev
    cd frontend
    npm run dev
```


## Environment Variables
Create a .env file in the root directory and add the following environment variables:
```bash
PORT=5000
MONGO_URI=your_mongoDB_URI
MONGO_URI_DEV=your_mongoDB_URI_for_development
JWT_SECRET=your_secret_key
MY_EMAIL=your_email
MY_EMAIL_PASSWORD=your_email_password
DEV_MODE="development"
DOMAIN_NAME="http://localhost:5000"
IMAGEKITIO_PUBLIC_URL="your_imagekitio_public_url"
IMAGEKITIO_PUBLIC_KEY="your_imagekitio_public_key"
IMAGEKITIO_PRIVATE_KEY="your_imagekitio_private_key"
```


### For Production
<details>
<summary><b>Deploy to Koyeb</b></summary>

[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?name=edufusion&repository=kavinda-100%2FEduFusion-node-v1&branch=main&instance_type=free&env%5BDEV_MODE%5D=production&env%5BDOMAIN_NAME%5D=%2F&env%5BIMAGEKITIO_PRIVATE_KEY%5D=private_CkWeZiK29SLCZZw7pp0G%2BydAxHo%3D&env%5BIMAGEKITIO_PUBLIC_KEY%5D=public_3HuRfU4dxj1XPANyYYncKsIalJ8%3D&env%5BIMAGEKITIO_PUBLIC_URL%5D=https%3A%2F%2Fik.imagekit.io%2F8egwgqka8&env%5BJWT_SECRET%5D=ueycywnuecgregirg72xr74tn7uh3ey7rnur4ehms884msmy47ueu3m9yrd4ynsm948m8y8y5y&env%5BMONGO_URI%5D=mongodb%2Bsrv%3A%2F%2Fkavindarathnayake100%3AxPFeON71tiYQEBns%40edufusioncluster.vhxb9.mongodb.net%2FEduFusion%3FretryWrites%3Dtrue%26w%3Dmajority%26appName%3DeduFusionCluster&env%5BMONGO_URI_DEV%5D=mongodb%3A%2F%2Flocalhost%3A27017%2Fedu-fution-dev&env%5BMY_EMAIL%5D=kavinda.local.dev%40gmail.com&env%5BMY_EMAIL_PASSWORD%5D=fnmuvtclcstslyno&env%5BPORT%5D=5000&env%5BVITE_IMAGEKITIO_PRIVATE_KEY%5D=private_CkWeZiK29SLCZZw7pp0G%2BydAxHo%3D&env%5BVITE_IMAGEKITIO_PUBLIC_KEY%5D=public_3HuRfU4dxj1XPANyYYncKsIalJ8%3D&env%5BVITE_IMAGEKITIO_PUBLIC_URL%5D=https%3A%2F%2Fik.imagekit.io%2F8egwgqka8&ports=5000%3Bhttp%3B%2F&hc_protocol%5B5000%5D=http&hc_grace_period%5B5000%5D=5&hc_interval%5B5000%5D=30&hc_restart_limit%5B5000%5D=3&hc_timeout%5B5000%5D=5&hc_path%5B5000%5D=%2Fhealth-check&hc_method%5B5000%5D=get)

</details>

