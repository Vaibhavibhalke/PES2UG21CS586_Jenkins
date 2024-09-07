import time
import threading
import cv2
import numpy as np
from mss import mss
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.action_chains import ActionChains
import logging
import os

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def record_screen(output_filename, duration):
    try:
        sct = mss()
        monitor = sct.monitors[0]
        out = cv2.VideoWriter(output_filename, cv2.VideoWriter_fourcc(*"XVID"), 20, (monitor["width"], monitor["height"]))

        start_time = time.time()
        while time.time() - start_time < duration:
            img = np.array(sct.grab(monitor))
            out.write(cv2.cvtColor(img, cv2.COLOR_RGBA2RGB))
    
        out.release()
        logging.info("Screen recording completed successfully.")
    except Exception as e:
        logging.error(f"Error in screen recording: {str(e)}")

def click_element(driver, by, value):
    element = WebDriverWait(driver, 20).until(
        EC.element_to_be_clickable((by, value))
    )
    driver.execute_script("arguments[0].scrollIntoView(true);", element)
    time.sleep(1)  # Give time for any animations to complete
    ActionChains(driver).move_to_element(element).click().perform()

def run_functional_test():
    driver = None
    try:
        logging.info("Initializing WebDriver...")

        # Chrome options for better compatibility
        from selenium.webdriver.chrome.options import Options
        chrome_options = Options()
        chrome_options.add_argument("--disable-infobars")
        chrome_options.add_argument("--disable-extensions")
        chrome_options.add_argument("--start-maximized")
        chrome_options.add_argument("--disable-popup-blocking")

        # Initialize WebDriver with options
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
        logging.info("WebDriver initialized successfully.")

        url = "https://demo.dealsdray.com/"
        logging.info(f"Navigating to URL: {url}")
        driver.get(url)

        username = "prexo.mis@dealsdray.com"
        password = "prexo.mis@dealsdray.com"

        logging.info("Attempting to log in...")
        username_field = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.NAME, "username"))
        )
        username_field.send_keys(username)

        password_field = driver.find_element(By.NAME, "password")
        password_field.send_keys(password)

        click_element(driver, By.XPATH, "//button[contains(text(), 'Login')]")
        logging.info("Login attempt completed.")

        # Navigation steps
        logging.info("Navigating to file upload section...")
        click_element(driver, By.XPATH, "//span[contains(text(), 'Order')]")
        click_element(driver, By.XPATH, "//span[contains(text(), 'Orders')]")
        click_element(driver, By.XPATH, "//button[contains(text(), 'Add Bulk Orders')]")

        # File upload steps
        logging.info("Uploading file...")
        file_path = os.path.abspath("C:/Users/HP/Desktop/Automate_Testing/demo-data.xlsx")
        logging.info(f"Resolved file path: {file_path}")
        file_input = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.XPATH, "//input[@type='file']"))
        )
        file_input.send_keys(file_path)

        # Click on Import button
        click_element(driver, By.XPATH, "//button[contains(text(), 'Import')]")

        # Wait for validation message
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.XPATH, "//div[contains(text(), 'File Upload Successfully')]"))
        )
        logging.info("File uploaded successfully.")

        # Validate the data
        logging.info("Validating uploaded data...")
        table_rows = WebDriverWait(driver, 20).until(
            EC.presence_of_all_elements_located((By.XPATH, "//table//tbody/tr"))
        )
        logging.info(f"Number of rows in the table: {len(table_rows)}")

        # Take screenshot
        screenshot_path = "C:/Users/HP/Desktop/Automate_Testing/final_output.png"
        logging.info("Taking screenshot...")
        driver.save_screenshot(screenshot_path)
        logging.info(f"Screenshot saved at '{screenshot_path}'")

    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
    finally:
        if driver:
            driver.quit()
            logging.info("WebDriver closed.")

if __name__ == "__main__":
    try:
        logging.info("Starting test execution...")
        
        # Start recording
        recording_output = "C:/Users/HP/Desktop/Automate_Testing/test_recording.mp4"
        recording_thread = threading.Thread(target=record_screen, args=(recording_output, 30))
        recording_thread.start()
        logging.info("Screen recording started.")

        # Run the test
        run_functional_test()

        # Wait for recording to finish
        recording_thread.join()
        logging.info("Screen recording thread joined.")

        logging.info("Test completed. Check 'test_recording.mp4' and 'final_output.png' in the 'Automate_Testing' folder.")
    except Exception as e:
        logging.error(f"Error in main execution: {str(e)}")
