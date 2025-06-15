// Custom remark plugin to handle HTML tags in tables
const remarkHtml = () => (tree) => {
  const visit = (node) => {
    if (node.type === 'html') {
      // Convert br tags to self-closing
      node.value = node.value.replace(/<br>/g, '<br/>');
    }
    if (node.children) {
      node.children.forEach(visit);
    }
  };
  visit(tree);
};

module.exports = { remarkHtml };
