# Global Weather App: Simple Weather Application

The **Global Weather App** is a user-friendly weather application that allows users to check real-time temperature and various weather parameters for any location worldwide. It is built using **HTML**, **CSS**, **JavaScript**, and integrates with a **Weather API**.

<p>Click here to see live application: <a href="https://global-weather-app-dev.netlify.app">Global Weather App</a></p> 

<p>Click here to see updated (Dark mode toggle) live application: <a href="https://updated-weather-app.netlify.app/">Updated Weather App</a></p> 


<div align="center">

[![Open Source Love](https://firstcontributions.github.io/open-source-badges/badges/open-source-v1/open-source.svg)](https://github.com/devjainofficial/Weather-app)
<img src="https://img.shields.io/badge/HacktoberFest-2024-blueviolet" alt="HacktoberFest Badge"/>
<img src="https://img.shields.io/static/v1?label=%E2%AD%90&message=If%20Useful&style=style=flat&color=BC4E99" alt="Star Badge"/>
<a href="https://github.com/devjainofficial" ><img src="https://img.shields.io/badge/Contributions-welcome-green.svg?style=flat&logo=github" alt="Contributions" /></a>

</div>

## 🌟 Features

- **Real-time Weather Data:** Get up-to-date temperature information for any location across the globe.
- **Detailed Weather Parameters:** View essential weather details such as humidity, wind speed, and general conditions.
- **Responsive Design:** The app works seamlessly on desktops, tablets, and smartphones.
- **Light/Dark Mode:** Toggle between light and dark mode to suit your preferences.
- **Simple UI:** Designed for ease of use, with an intuitive interface to quickly search for locations.

## 🛠️ Technologies Used

- **HTML:** Structure of the web pages.
- **CSS:** Styling for an aesthetically pleasing interface.
- **JavaScript:** To fetch weather data from the API and add interactivity.
- **Weather API:** Used to retrieve real-time weather data.

## 🚀 How to Use

1. **Fork and Contribute:**
   - **Fork the Repository:**
     Head over to the original repository and click the "Fork" button at the top-right corner.
     
2. **Clone your Forked Repository:**
     After forking, clone the repository to your local machine:
     ```bash
     git clone https://github.com/your-username/Weather-app.git
     ```
3. **Open `index.html`:**
   Open the `index.html` file in your preferred web browser.

4. **Enter Location:**
   Type the location you want to check the weather for in the input field.

5. **View Weather Information:**
   Press the "Get Weather" button to see the temperature and other details.

6.  **Create a New Branch:**
     Always make changes in a separate branch:
     ```bash
     git checkout -b feature-branch
     ```

   - **Make Your Changes:**
     Implement the feature or fix the issue you want to work on.

   - **Commit Your Changes:**
     Once changes are made, commit them:
     ```bash
     git add .
     git commit -m "Brief description of your changes"
     ```

   - **Push Your Changes:**
     Push the changes to your forked repository:
     ```bash
     git push origin feature-branch
     ```

   - **Create a Pull Request:**
     Go to the original repository, open your fork, and submit a pull request. Describe the changes made.

## 🌄 Screenshots

### Light Mode

![image](https://github.com/devjainofficial/Weather-app/assets/69387311/2383af03-0ab9-424b-a4bb-95946f367c5d)

### Dark Mode

![darkmode](https://github.com/abhijeetsharnagat/Weather-app/assets/108009757/f77685f8-c428-416c-8992-56ac008c7d77)

## 🏗️ Contributing

We welcome contributions! If you want to help improve the project or have suggestions, you can follow the steps in the **How to Use** section or refer to the detailed guide here.

## 🌍 Our Contributors

We value the amazing people who contribute to this project! You can check out all the contributors [here](https://github.com/devjainofficial/Weather-app/graphs/contributors).

<div align="center">

<a href="https://github.com/devjainofficial/Weather-app/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=devjainofficial/Weather-app" />
</a>

</div>

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## Project Structure

*   `index.html`: The main HTML file for the weather application.
*   `css/`: Contains stylesheets.
    *   `style.css`: Main styles for the application.
    *   `modal.css`: Styles for the initial location permission modal.
*   `js/`: Contains JavaScript files.
    *   `config.js`: (To be created by the user) Stores the API key. A `js/config.example.js` could be provided as a template if desired.
    *   `main.js`: Core application logic, including API calls, UI updates, and event handling.
    *   `modal.js`: Logic for the initial location permission modal.
    *   `tests/main.test.js`: Basic unit tests for parts of the application logic.
*   `images/`: Contains static image assets.
*   `feature/`: Contains text files related to features.
*   `.gitignore`: Specifies intentionally untracked files (e.g., `js/config.js`).
*   `LICENSE`: The project's license file.

## API Key Setup

This project uses the WeatherAPI.com service. To fetch weather data, you need an API key.

1.  Create a file named `config.js` inside the `js/` directory.
2.  Add the following content to `js/config.js`, replacing `'YOUR_API_KEY_HERE'` with your actual API key:
    ```javascript
    const API_KEY = 'YOUR_API_KEY_HERE';
    ```
3.  The `js/config.js` file is included in `.gitignore` and should not be committed to version control.

## Running Tests

Basic unit tests are located in `js/tests/main.test.js`. To run these tests:

1.  Ensure you have set up your API key as described above (though tests for `updateUVIndex` don't require the API key to run).
2.  Manually add the test script to your `index.html` file before the closing `</body>` tag:
    ```html
    <script src="js/tests/main.test.js"></script>
    ```
3.  Open `index.html` in your web browser.
4.  Open the browser's developer console to see the test results.
