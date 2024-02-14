# Demo Application

This is a demo application showcasing the following functionalities:

## User Management

- Create, update, and read all users.
- Users can have multiple locations.

## Weather API Integration

There are two APIs provided to fetch the current weather using a third-party service:

1. **Weather API with Location ID:**
   - Endpoint: `/weather/:locationId`
   - Description: This API retrieves weather information for a specific location using its ID.

2. **Weather API with Query Parameters:**
   - Endpoint: `/weather`
   - Description: This API fetches weather information based on query parameters, following the format accepted by the Open Weather service provider.

    History api was available only in paid version, due to time constraint and existing workload not explored, If its mandatory do let me know, or provide the `apiKey` for same.

## Start the project 

1. Install docker 
2. run docker compose up 

## Swagger Docs 
`http://localhost:3000/swagger`
̦
## Tech Details 
1. Added caching mechanism 
2. Added Validations 
3. Added Logging 
4. Rate Limiter 
5. Utilized env variable
5. Custom success and Error handler
6. Third party error handler and logged in the logs.
7. Docker implemented
