import yijingData from "./static/yijing";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cji32l0bm1zkn0156lmp8kl6f"
});

for (let hexagram in yijingData) {
  console.log(yijingData[hexagram][0].nameEng);

  const query = gql(`mutation newHex(
      $kingwen: String!,
    $fuxi: String!,
    $html: String!,
    $nameMan: String!,
    $nameEng: String!,
    $above: String!,
    $below: String!,
    $description: String!,
    $judgement: String!,
    $image: String!,
    $line1Number: String!,
    $line1: String!,
    $line2Number: String!,
    $line2: String!,
    $line3Number: String!,
    $line3: String!,
    $line4Number: String!,
    $line4: String!,
    $line5Number: String!,
    $line5: String!,
    $line6Number: String!,
    $line6: String!) {
    createHexagram(
      kingwen: $kingwen
      fuxi: $fuxi,
      html: $html,
      nameMan: $nameMan,
      nameEng: $nameEng,
      above: $above,
      below: $below,
      description: $description,
      judgement:  $judgement,
      image: $image,
      line1Number: $line1Number,
      line1: $line1,
      line2Number: $line2Number,
      line2: $line2,
      line3Number: $line3Number,
      line3: $line3,
      line4Number: $line4Number,
      line4: $line4,
      line5Number: $line5Number,
      line5: $line5,
      line6Number: $line6Number,
      line6: $line6
    ) {
      id  
    }
  }`);

  client.mutate({
    mutation: query,
    variables: {
      kingwen: yijingData[hexagram][0].kingwen,
      fuxi: yijingData[hexagram][0].fuxi,
      html: yijingData[hexagram][0].html,
      nameMan: yijingData[hexagram][0].nameMan,
      nameEng: yijingData[hexagram][0].nameEng,
      above: yijingData[hexagram][0].above,
      below: yijingData[hexagram][0].below,
      description: yijingData[hexagram][0].description,
      judgement: yijingData[hexagram][0].judgement,
      image: yijingData[hexagram][0].image,
      line1Number: yijingData[hexagram][0].line1Number,
      line1: yijingData[hexagram][0].line1,
      line2Number: yijingData[hexagram][0].line2Number,
      line2: yijingData[hexagram][0].line2,
      line3Number: yijingData[hexagram][0].line3Number,
      line3: yijingData[hexagram][0].line3,
      line4Number: yijingData[hexagram][0].line4Number,
      line4: yijingData[hexagram][0].line4,
      line5Number: yijingData[hexagram][0].line5Number,
      line5: yijingData[hexagram][0].line5,
      line6Number: yijingData[hexagram][0].line6Number,
      line6: yijingData[hexagram][0].line6
    }
  });
}
