'use strict';

const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome to the ${chalk.red('ansible-role')} generator!`
    ));

    let prompts = [{
      type: 'input',
      name: 'name',
      message: 'Ansible role name',
      default: this.appname
    }, {
      type: 'input',
      name: 'description',
      message: 'Role description'
    }, {
      type: 'input',
      name: 'authorName',
      message: 'Author Name',
      // store: true
    }, {
      type: 'input',
      name: 'companyName',
      message: 'Comany Name',
      // store: true
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: {
    renderTemplates: function () {
      let context = { props: this.props };
      let copyOpts = { globOptions: { dot: true } };
      this.fs.copyTpl(
        this.templatePath('**/*'),
        this.destinationPath(''),
        context, null, copyOpts
      );
    },

    gitInit: function () {
      this.composeWith('git-init', {}, {
        local: require.resolve('generator-git-init')
      });
    }
  },

  install: function () {}
});
