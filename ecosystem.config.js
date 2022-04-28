module.exports = {
  apps : [{
    name: 'mock-auth-api',
    exec_mode: 'cluster',
    script: 'index.js',
  }],
  deploy: {
    dev: {
      user: 'root',
      host: '45.77.38.146',
      repo: 'git@github.com:trandaison/mock-auth-api.git',
      ref: 'origin/main',
      path: '/app/mock-auth-api',
      'post-deploy': 'yarn install && pm2 start',
    },
  },
};
