import { BaseModal } from "./BaseModal";
import Link from 'next/link';


export const FaqModal = ({ isOpen, handleClose }) => {
    return (
      <BaseModal title="Sıkça Sorulan Sorular" isOpen={isOpen} handleClose={handleClose}>
        <p className="text-left py-2 font-bold text-md text-gray-900 dark:text-gray-200">
            Semantrik nedir?
        </p>
        <p className="text-left text-md text-gray-600 dark:text-gray-200">
            Semantrik her gün hedef kelimenin değiştiği bir bilmece oyunu. Tahmin ettiğiniz her kelimenin
            hedef kelimeye semantik benzerlik skoru hesaplanır ve bu sayede bulmacaya ne kadar yakın olduğunu görebilirsiniz. Bu
            skor kelimelerin cümleler ve dökümanlarda ne kadar sıklıkta birlikte kullanıldığına göre hesaplanmaktadır. Örneğin, "araba"
            ve "yarış" arasındaki semantik benzerlik skoru, "araba" ve "kedi" arasındaki benzerlik skorundan daha yüksektir.
        </p>

        <p className="text-left py-2 font-bold text-md text-gray-900 dark:text-gray-200">
            Uzaklıklar nasıl hesaplandı?
        </p>
        <p className="text-left text-md text-gray-600 dark:text-gray-200">
            Açık kaynak CC-100 (Common Crawl) Türkçe veri seti kullanılarak, word2vec dil modeli eğitildi. Bu model, her
            kelime için bir vektör oluşturdu ve bu vektörler arasındaki uzaklık kullanılarak 0 ile 100 arasında bir
            benzerlik skoru hesaplandı.
        </p>

        <p className="text-left py-2 font-bold text-md text-gray-900 dark:text-gray-200">
            Bunu kim yaptı?
        </p>
        <p className="text-left text-md text-gray-600 dark:text-gray-200">
            Soysal Değirmenci (soysald at gmail dot com)
        </p>
        <Link className="text-center text-md text-blue-500 dark:text-blue-500"
            href="https://degirmenci.me">
          https://degirmenci.me
        </Link>

      </BaseModal>
    )
  }  