import chalk from 'chalk';

const stringReverseHandler = (chunk) =>
    chalk.green(chunk.toString().split('').reverse().join(''));

process.stdin.on('data', (message) => {
    process.stdout.write(`${stringReverseHandler(message)} \r\n`);
});

process.on('SIGINT', () => {
    process.stdout.write(
        chalk.bgRed('program is about to terminate process \r\n')
    );
});

const handleExit = (signal) => {
    process.stdout.write(chalk.bgRed(`Received ${signal} exiting \r\n`));
    process.exit();
};

process.on('SIGINT', handleExit);
