import axios from "axios";
import { useRouter } from "next/router";
import constants from "../../../assets/utils/variables";

import StudentScore from "../../../assets/components/StudentScore";
import Text from "../../../assets/components/Text";
import View from "../../../assets/components/View";

export default function score({ data }) {
  return (
    <div className="center">
      <View>
        <Text textAlign='center' fontSize={2} >النتيجة</Text>
      </View>
      {data.status == "success" ? (
        <StudentScore open={true} data={data.data} />
      ) : (
        <Text>حدث خطا ما</Text>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  const response = await axios.get(`${constants.URL}/student/${id}`);
  return {
    props: { data: response.data }, // will be passed to the page component as props
  };
}
