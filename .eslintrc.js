// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'eslint:recommended',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    //在条件表达式当中禁止运算符
    'no-cond-assign': ['error', 'except-parens'],
    //禁止if(a),这样的表达
    'no-constant-condition': 'error',
    //禁止重复定义参数
    'no-dupe-args': 'error',
    //禁止在对象中重复定义key
    'no-dupe-keys': 'error',
    //禁止在case中出现重复
    'no-duplicate-case': 'error',
    //禁止块语句内为空
    'no-empty': 'error',
    //禁止多余的判断，如!!!a
    'no-extra-boolean-cast': 'error',
    //控制if后面的在同一行
    'brace-style': ['error', '1tbs', {allowSingleLine: true}],
    //不强制驼峰命名
    camelcase: 'off',
    'comma-spacing': ['error', {before: false, after: true}],
    // 控制逗号在行尾出现还是在行首出现
    'comma-style': ['error', 'last'],
    //关键词的空格
    'keyword-spacing': ['error', {
      before: true,
      after: true,
      overrides: {
        return: {after: true},
        throw: {after: true},
        case: {after: true}
      }
    }],
    //对象中的key，value的空格
    'key-spacing': ['error', {beforeColon: false, afterColon: true}],
    indent: ['error', 2, {SwitchCase: 1, VariableDeclarator: 1}],
    //强制使用全等，除了null
    eqeqeq: ['error', 'allow-null'],
    //不强制点是否可以出现在行的开头
    'dot-location': 'off',
    //尽量使用点
    //'dot-notation': [ 'error', { allowKeywords: true }],
    //在switch中不要有default
    'default-case': ['error', {commentPattern: '^no default$'}],
    //强制分号结尾
    "semi": ['error', "always"]
  }
};

