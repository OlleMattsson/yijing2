import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const query = gql(`
query gethex($fuxi: String!)
  {
    allHexagrams(filter: { fuxi: $fuxi  }) {
      kingwen
      fuxi
      nameEng
      description
      judgement
    }
  }
`);

export default class HexagramData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }

  componentDidUpdate() {
    if (this.props.fuxi !== this.state.fuxi) {
      this.setState({ fuxi: this.props.fuxi });
    }
  }

  render() {
    return (
      <Query query={query} variables={{ fuxi: this.state.fuxi.toString() }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          if (data.allHexagrams.length === 0) {
            return <p>Data missing</p>;
          }

          const content = data.allHexagrams[0];

          return (
            <div>
              <p>{content.nameEng}</p>
              <p dangerouslySetInnerHTML={{ __html: content.description }}  style={{fontSize: 15}}/>
            </div>
          );
        }}
      </Query>
    );
  }
}
