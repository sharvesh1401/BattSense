<!--
  Replace YOUR_SITE_ID and YOUR_SITE_NAME with your actual Netlify site details
  after deploying the project.
-->
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_SITE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_SITE_NAME/deploys)

# ⚡ BattSense: Battery Health Prediction Using Machine Learning

**BattSense** is a machine learning project that aims to estimate the **State of Health (SOH)** of lithium-ion batteries based on historical sensor data. This is especially useful for applications in **electric vehicles**, **consumer electronics**, and **battery lifecycle monitoring**.

---

## 🚀 Project Objective

To build an intelligent model that can **predict battery health (SOH)** using data-driven techniques. The goal is to understand and predict battery degradation over time using regression algorithms.

---

## 📁 Dataset

- **Source**: Battery data collected from operational cycles (source is user defined).
- **Features** include:
  - `Battery Voltage`
  - `Current`
  - `Temperature`
  - `Charge Cycles`
  - `Capacity`
- **Target**:
  - `State of Health (SOH)`

> The dataset has been preprocessed and used directly within the notebook. Missing values and anomalies have been handled.

---

## 🧠 Model Used

- **Random Forest Regressor**
  - Handles non-linearity well
  - Performs feature selection internally
  - Robust to overfitting with sufficient data

Other models can also be tested and compared in the future for improved accuracy.

---

## 📊 Evaluation Metrics

- **Mean Squared Error (MSE)**
- **Root Mean Squared Error (RMSE)**
- **R² Score** (to be added)
- **MAE** (Mean Absolute Error - recommended addition)

