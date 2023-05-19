import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { UsersIcon } from "@heroicons/react/24/solid";
import { ConsoleGet } from '../models/Console'
import { getConsoles } from '../api/ConsolesApi'
import { imagePathToURL } from '../models/Image'
import { useEffect, useState } from 'react'


function HomePage() {
  const { t } = useTranslation();
  const [consoles, setConsoles] = useState<ConsoleGet[]>()
  const [loading, setLoading] = useState<boolean>(true)
  

  useEffect(() => {
    getConsoles().then((response) => {
        setConsoles(response.data)
        setLoading(false)
    })
  }, [])

  return (
    <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
      <div className="absolute top-0 h-full w-full bg-[url('https://s.yimg.com/uu/api/res/1.2/_PwbLE5uNnw_Vpay7hJ_Tw--~B/Zmk9ZmlsbDtoPTYzMDtweW9mZj0wO3c9MTIwMDthcHBpZD15dGFjaHlvbg--/https://o.aolcdn.com/hss/storage/midas/bb69e230fd1238be04fbad26588ed2ef/204527311/battlefield-ed.jpg.cf.jpg')] bg-cover bg-center" />
      <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      <div className="max-w-8xl container relative mx-auto">
        <div className="flex flex-wrap items-center">
          <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
            <Typography variant="h1" color="white" className="mb-6 font-black">
              {t('home.title1')}
            </Typography>
            <Typography variant="h1" color="white" className="mb-6 font-black">
              ShareIt
            </Typography>
            <Typography variant="h1" color="white" className="mb-6 font-black">
              {t('home.title2')}
            </Typography>
          </div>
          <section className="-mt-32 bg-gray-50 px-4 pb-20 pt-4">
            <div className="mt-32 flex flex-wrap items-center">
              <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white p-3 text-center shadow-lg">
                  <div className="mr-20">
                  <div className="flex flex-wrap items-center">
                    <Typography variant="h3" className="mb-3 font-bold" color="blue-gray">
                      {t('home.selectBorrowText')}
                    </Typography>
                    <Link to="#besiskolinantiems" className="p-5 bg-bg-extra rounded-lg text-center m-3">
                      {t('home.selectBorrowButton')}
                    </Link>
                    </div>
                  </div>
                  <div>
                  <div className="flex flex-wrap items-center">
                    <Typography variant="h3" className="mb-3 font-bold" color="blue-gray">
                      {t('home.selectLendText')}
                    </Typography>
                    <Link to="#skolintojams" className="p-5 bg-bg-extra rounded-lg text-center m-3">
                      {t('home.selectLendButton')}
                    </Link>
                    </div>
                    </div>
                  </div>
                </div> 
              </div>
            </section>
          </div>
        </div>

        <div className="h-60"></div>
        <div id="besiskolinantiems" className="h-20"></div>
        <div className="bg-bg-tertiary mt-32 mb-80 py-5 h-96">
          <div className="text-fs-h1 ml-10">{t('home.borrowers1')}</div>
          <div className="text-fs-h2 ml-14">
            {t('home.borrowers2')}
            <div className="mt-5">
              <Link
                to="/registerBorrower"
                className="cursor-pointer select-none my-auto mr-7 bg-bg-extra p-3 rounded-lg w-64"
              >
                {t('home.borrowers3')}
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            {consoles?.map((console) => (
              <div className="rounded-lg w-[250px] m-3 cursor-pointer select-none">
                <img
                  className="rounded-md"
                  src={imagePathToURL(console.images[0].path, 250)}
                  alt={console.images[0].name}
                />
              </div>
            ))}
          </div>
        </div>
        <div id="skolintojams" className="h-20"></div>
        <div className="bg-bg-tertiary mt-32 mb-80 py-5 h-96">
          <div className="text-fs-h1 ml-10">{t('home.lenders1')}</div>
          <div className="text-fs-h2 ml-14 mb-60">
            <div>{t('home.lenders2')}</div>
            <div>{t('home.lenders3')}</div>
            <div className="mt-5">
              <Link
                to="/register"
                className="cursor-pointer select-none my-auto mr-7 bg-bg-extra p-3 rounded-lg w-64"
              >
                {t('home.lenders4')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
}

export default HomePage
