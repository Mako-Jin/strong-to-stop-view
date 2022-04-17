const { defineConfig } = require("eslint-define-config");
module.exports = defineConfig({
  // ↓默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。
  // 如果你想要你所有项目都遵循一个特定的约定时，这将会很有用，但有时候会导致意想不到的结果。
  // 为了将 ESLint 限制到一个特定的项目，在你项目根目录下的 package.json 文件
  // 或者 .eslintrc.* 文件里的 eslintConfig 字段下设置 "root": true。
  // ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
  // ↓此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,
  // ↓指定你想启用的环境
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  // ↓设置解析器
  parser: "vue-eslint-parser",
  // ↓扩展项
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:jest/recommended",
  ],
  // ↓解析器选项
  parserOptions: {
    ecmaVersion: 12,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint", "prettier"],
  // ↓自定义规则配置
  rules: {
    "@typescript-eslint/ban-ts-ignore": "off", // 禁止使用@ts-ignore来消除ESLint检查
    "@typescript-eslint/no-unused-vars": ["error"], // 未使用变量以error发出警告
    "@typescript-eslint/explicit-function-return-type": "off", // 在函数和类方法上需要显式的返回类型
    "@typescript-eslint/no-explicit-any": "off", // 禁止使用any类型
    "@typescript-eslint/no-var-requires": "off", // 除导入语句外，禁止使用require语句
    "@typescript-eslint/no-empty-function": "off", // 禁止使用空函数
    "@typescript-eslint/no-use-before-define": "off", // 在定义变量之前不允许使用变量
    "no-use-before-define": "off", // 禁止定义前使用
    "@typescript-eslint/ban-ts-comment": "off", // 禁止使用@ts-注解
    "@typescript-eslint/ban-types": "off", // 禁止使用特定类型
    "@typescript-eslint/no-non-null-assertion": "off", // 禁止使用!后缀运算符进行非null断言
    "@typescript-eslint/explicit-module-boundary-types": "off", // 在导出的函数和类的公共类方法上需要显式的返回值和参数类型
    "no-var": "error", // 此规则旨在阻止var使用或鼓励改为使用const或let。
    "no-unused-vars": ["error"], // 禁止定义未使用的变量
    "prettier/prettier": "error",
    "no-console": "warn", // 禁止出现console
    "no-debugger": "warn", // 禁用debugger
    "no-duplicate-case": "warn", // 禁止出现重复的 case 标签
    "no-empty": "warn", // 禁止出现空语句块
    "no-extra-parens": "off", // 禁止不必要的括号
    "no-func-assign": "warn", // 禁止对 function 声明重新赋值
    "no-unreachable": "error", // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    curly: "warn", // 强制所有控制语句使用一致的括号风格
    "default-case": "warn", // 要求 switch 语句中有 default 分支
    "dot-notation": "warn", // 强制尽可能地使用点号
    eqeqeq: "warn", // 要求使用 === 和 !==
    "no-else-return": "warn", // 禁止 if 语句中 return 语句之后有 else 块
    "no-empty-function": "warn", // 禁止出现空函数
    "no-lone-blocks": "warn", // 禁用不必要的嵌套块
    "no-multi-spaces": "warn", // 禁止使用多个空格
    "no-redeclare": "warn", // 禁止多次声明同一变量
    "no-return-assign": "warn", // 禁止在 return 语句中使用赋值语句
    "no-return-await": "warn", // 禁用不必要的 return await
    "no-self-assign": "warn", // 禁止自我赋值
    "no-self-compare": "warn", // 禁止自身比较
    "no-useless-catch": "warn", // 禁止不必要的 catch 子句
    "no-useless-return": "warn", // 禁止多余的 return 语句
    "no-shadow": "off", // 禁止变量声明与外层作用域的变量同名
    "no-delete-var": "off", // 允许delete变量
    "array-bracket-spacing": "warn", // 强制数组方括号中使用一致的空格
    "brace-style": "warn", // 强制在代码块中使用一致的大括号风格
    camelcase: ["warn", { properties: "never" }], // 强制使用骆驼拼写法命名约定
    indent: "off", // 强制使用一致的缩进
    "jsx-quotes": "warn", // 强制在 JSX 属性中一致地使用双引号或单引号
    "max-depth": "warn", // 强制可嵌套的块的最大深度4
    "max-lines": ["warn", { max: 800 }], // 强制最大行数 300
    "max-lines-per-function": ["warn", { max: 80 }], // 强制函数最大代码行数 50
    "max-statements": ["warn", 30], // 强制函数块最多允许的的语句数量20
    "max-nested-callbacks": ["warn", 3], // 强制回调函数最大嵌套深度
    "max-params": ["warn", 5], // 强制函数定义中最多允许的参数数量
    "max-statements-per-line": ["warn", { max: 1 }], // 强制每一行中所允许的最大语句数量
    "newline-per-chained-call": ["warn", { ignoreChainWithDepth: 3 }], // 要求方法链中每个调用都有一个换行符
    "no-lonely-if": "warn", // 禁止 if 作为唯一的语句出现在 else 语句中
    "no-mixed-spaces-and-tabs": "warn", // 禁止空格和 tab 的混合缩进
    "no-multiple-empty-lines": "warn", // 禁止出现多行空行
    semi: [0], // 行末必须加分号
    "space-before-blocks": "warn", // 强制在块之前使用一致的空格
    // "space-before-function-paren": ["warn", "never"], // 强制在function的左括号之前使用一致的空格
    "space-in-parens": "warn", // 强制在圆括号内使用一致的空格
    "space-infix-ops": "warn", // 要求操作符周围有空格
    "space-unary-ops": "warn", // 强制在一元操作符前后使用一致的空格
    "spaced-comment": "warn", // 强制在注释中 // 或 /* 使用一致的空格
    "switch-colon-spacing": "warn", // 强制在 switch 的冒号左右有空格
    "arrow-spacing": "warn", // 强制箭头函数的箭头前后使用一致的空格
    // 'vue/attributes-order': 'off', // 强制属性顺序
    "prefer-const": "warn",
    "prefer-rest-params": "warn",
    "no-useless-escape": "warn",
    "no-irregular-whitespace": "warn",
    "no-prototype-builtins": "warn",
    "no-fallthrough": "warn",
    "no-extra-boolean-cast": "warn",
    "no-case-declarations": "warn",
    "no-async-promise-executor": "warn",
    "vue/custom-event-name-casing": "off", // 对自定义事件名称强制使用特定的大小写
    "vue/multi-word-component-names": "off", // 组件可以是单英文单词
    "vue/one-component-per-file": "off", // 强制每个组件应位于其自己的文件中
    "vue/html-closing-bracket-newline": "off", // 在标签的右括号之前要求或不允许换行
    "vue/max-attributes-per-line": "off", // 强制每行的最大属性数
    "vue/multiline-html-element-content-newline": "off", // 在多行元素的内容之前和之后需要换行
    "vue/singleline-html-element-content-newline": "off", // 在单行元素的内容之前和之后需要换行
    "vue/attribute-hyphenation": "off", // 在模板中的自定义组件上实施属性命名样式
    "vue/require-default-prop": "off", // 需要道具的默认值
    // 'vue/html-self-closing': 'off', // ↓实施自我封闭的风格
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "never",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
  },
});
