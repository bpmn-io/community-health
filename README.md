> [!WARNING]
> This is an experimental library and not officially supported / endorsed by [bpmn.io](https://bpmn.io/).

# community-health

Get report on community health. Use Slack application to receive reports in the workspace.

## Installation

```sh
npm install --global @bpmn-io/community-health
```

## Usage

### Slack app

Slack application expects `/community-health` slash command to generate the report.

Configure `SLACK_SIGNING_SECRET`, `SLACK_BOT_TOKEN`, `PORT` as environment variables. Optionally, configure `LOG_LEVEL`.

Run:

```sh
npm start
```

### CLI

Run:

```sh
community-health
```

## Additional resources

* [Issue tracker](https://github.com/bpmn-io/community-health/issues)
* [Forum](https://forum.bpmn.io)

## Development

Prepare the project by installing all dependencies:

```sh
npm install
```

Then, depending on your use-case, you may run any of the following commands:

```sh
# run linter, and test the library
npm run all

# lint
npm run lint

# test
npm test
```

## License

MIT
