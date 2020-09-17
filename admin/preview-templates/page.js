import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

// Preview component for a Page
const Page = createClass({
  render() {
    const entry = this.props.entry;

    return html`
      <main>
        <h1>${entry.getIn(['data', 'title'], null)}</h1>

        ${this.props.widgetsFor('blocks').map((entry, index) => {
          switch (entry.getIn(['data', 'type'])) {
            case 'header':
              return h(
                `h${entry.getIn(['data', 'level'])}`,
                { key: index },
                entry.getIn(['data', 'heading'])
              );

            case 'paragraph': {
              return h(CMS.resolveWidget('markdown').preview, {
                key: index,
                value: entry.getIn(['data', 'text']),
                resolveWidget: CMS.resolveWidget,
                getAsset: this.props.getAsset,
              });
            }

            case 'highlight':
              return h(CMS.resolveWidget('image').preview, {
                key: index,
                value: entry.getIn(['data', 'image']),
                resolveWidget: CMS.resolveWidget,
                getAsset: this.props.getAsset,
              });

            default:
              return html``;
          }
        })}
        ${this.props.widgetFor('body')}
      </main>
    `;
  },
});

export default Page;
