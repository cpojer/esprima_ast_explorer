/**
 * @jsx React.DOM
 */
"use strict";

var Editor = require('./Editor');
var React = require('react/addons');

var j = require('../../jscodeshift');

var cx = React.addons.classSet;

var TransformOutput = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  propTypes: {
    transform: React.PropTypes.string,
    code: React.PropTypes.string,
  },

  createTransform: function() {
    return [
      "var module = {};",
      "(function() {",
      this.props.transform,
      "})();",
      "result = module.exports.apply(module.exports, " + JSON.stringify([
        'Live.js',
        this.props.code,
        {}
      ]) + ");",
    ].join("\n");
  },

  transform: function() {
    var result;
    eval(this.createTransform());
    return result;
  },

  render: function() {
    return (
      <div className="output highlight">
        <Editor
          highlight={false}
          readOnly={true}
          value={this.transform()}
        />
      </div>
    );
  }
});

module.exports = TransformOutput;
