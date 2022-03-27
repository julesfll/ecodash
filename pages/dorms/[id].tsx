import type { NextPage } from "next";
import DetailView from "../../components/DetailView";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter()
  const {id} = router.query
  console.log(id)
  return (
    <div>
      <DetailView dorm={id}/>
    </div>
  );
};

export default Home;
