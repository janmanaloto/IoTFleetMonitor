# IoT Fleet Device Monitor

This project monitors IoT devices for their connection status and sends notifications to Microsoft Teams. It uses Azure IoT Hub for device status and Microsoft Teams Adaptive Cards for notifications.

## Features
- Fetches device connection status from Azure IoT Hub.
- Sends detailed reports to Microsoft Teams.
- Supports time zone adjustments for last activity time.
- Easily configurable via `.env`.

## Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the `.env` file:
   ```bash
   cp .env.example .env
   ```
   Fill in the required values in `.env`.

4. Run the application:
   ```bash
   node src/monitor.js
   ```

## Tests
Run unit and integration tests using Jest:
```bash
npm test
```

## Directory Structure
- `src/`: Application source code.
- `tests/`: Unit and integration tests.

## Dependencies
- `azure-iothub`: Interact with Azure IoT Hub.
- `axios`: Make HTTP requests.
- `dotenv`: Load environment variables.
- `jest`: Testing framework.

## License
MIT
