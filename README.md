# NOTAM Team Project

A senior capstone project at the University of Oklahoma, focusing on improving the way pilots access and interact with Notices to Airmen (NOTAMs).

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Python](https://www.python.org/) (v3.6 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)

## Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/notam-team-project.git
cd notam-team-project
```

2. Install the necessary Node.js and Python packages:

```
npm install
```

3. Create a `.env` file in the project root directory using the provided `.env_default` template:

```
cp .env_default .env
```

4. Obtain the `client-id` and `client-secret` from the [FAA NOTAM API](https://api.faa.gov/s/). Add these credentials to the `.env` file:

```
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
```

5. Install the [nodemon](https://www.npmjs.com/package/nodemon) package globally:

```
npm install -g nodemon
```

## Usage

To start the development server, run:

```
nodemon
```

Open your browser and navigate to `http://localhost:3000` (or the appropriate port) to view the application.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
