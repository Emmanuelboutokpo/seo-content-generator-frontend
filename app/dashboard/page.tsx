"use client"

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useChat } from '../services/context/ChatContext';

export default function Main() {
  const { activeChat, chats, setActiveChat, handleNewChat } = useChat();
   console.log(activeChat);
   
    const [message, setMessage] = useState('');
  
    const handleSendMessage = (e: React.FormEvent) => {
      e.preventDefault();
      if (!message.trim() || !activeChat) return;
  
    };
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll vers le bas quand nouveaux messages arrivent
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);


  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            {/* Titre fixe en haut */}
            <div className="sticky top-0 z-10 h-10">
              <h2 className="text-xl text-center mt-1.5 font-semibold">
               Django API error
              </h2>
            </div>

            {/* Zone de messages scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="max-w-3xl mx-auto space-y-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt possimus reprehenderit iste veniam iusto molestiae aliquid beatae deleniti, alias dolorum. Minus incidunt libero nostrum quo commodi repellendus ad. Quaerat, ipsam!
                  Voluptatem, aspernatur atque. Accusantium impedit dicta magnam repellendus laudantium dolorum, debitis quibusdam, rerum enim, iste itaque ipsum quae eum. Expedita facilis omnis suscipit veniam soluta illum incidunt vitae illo eligendi.
                  Nemo repellendus commodi at fugit sunt libero voluptatem laboriosam earum esse quos maiores nostrum, ducimus quis mollitia qui ea repudiandae molestiae, aliquid dignissimos. Vitae, eius nobis? Eos cum esse possimus?
                  Nam unde, obcaecati sequi iste amet assumenda voluptatum repellendus hic facere enim voluptatem saepe blanditiis voluptate sit commodi accusantium, magni illo, itaque magnam repellat cupiditate? Veniam explicabo animi eius laboriosam!
                  Reiciendis possimus quaerat hic, a minima quae mollitia veniam tenetur est sint impedit optio ducimus nobis exercitationem praesentium adipisci molestias maiores sit, consequatur molestiae cumque ullam! Eos quaerat quisquam nulla!
                  Minima corporis explicabo tempore sequi dignissimos? Numquam, dolore quos vero culpa ipsa nobis veritatis in dolores adipisci, eum cumque libero id autem voluptatum voluptatem. Id animi ipsam quae velit adipisci.
                  Sapiente, obcaecati. Eligendi error optio hic quaerat. Nulla ratione architecto commodi magnam? Exercitationem ipsam officia doloremque non nulla, nisi itaque mollitia, omnis commodi hic nihil sed, porro blanditiis harum quia?
                  Aspernatur omnis est dolor explicabo saepe perferendis consectetur, aperiam quaerat recusandae vel ex non iusto repudiandae dolorem corporis architecto sed obcaecati. Consequuntur soluta facere eligendi minima libero amet repellat. Mollitia?
                  Reprehenderit quis repellendus consequatur alias unde laudantium ducimus! Soluta officia maxime ullam ducimus dolorum. Odit neque natus voluptates? Ipsa ipsum tempora officia, unde odit sequi in quis sapiente dolorem optio!
                  Recusandae, in odio quidem voluptate provident tempore ullam consequuntur aut sit eos adipisci quia quod tempora laboriosam eligendi delectus amet modi architecto laudantium perspiciatis repellendus voluptatem molestias nulla. Eum, pariatur.
                  Eligendi, sequi cupiditate tempora quis consequatur incidunt ipsum suscipit corrupti, assumenda laudantium fugiat similique veniam dolores officia quidem inventore illo ipsam ut voluptas! Recusandae, reprehenderit doloremque. Vitae quibusdam ipsum inventore?
                  Officia ut aut nobis. Exercitationem natus tempore harum delectus ut doloremque, officiis, numquam expedita, aspernatur blanditiis iste nihil voluptas inventore repellat quos cumque perferendis cupiditate aperiam id reiciendis quibusdam! A!
                  Debitis eius quidem ipsa eaque voluptatibus ipsum accusamus inventore quia ut expedita natus, nobis odit laboriosam quasi rerum tempore numquam iusto in assumenda aspernatur nostrum dolorum! Dolorem corrupti at iste!
                  Delectus pariatur inventore recusandae ex sequi facilis tenetur enim tempore, eius autem minima beatae, harum vel excepturi nam voluptates accusamus natus dolor iste dolorem quia, quae hic magni cumque? Eos!
                  Labore, iusto exercitationem! A minima beatae perspiciatis aperiam laboriosam doloribus, eveniet assumenda suscipit non ex placeat. Cum similique corrupti asperiores at perferendis nam molestiae. Temporibus totam magnam tempora qui sunt.
                  Quisquam sed accusamus, ut similique deleniti, ducimus iusto veniam impedit doloribus ex distinctio ab doloremque veritatis possimus, ea minus repellendus eius minima rem nobis voluptatem deserunt consequuntur. Distinctio, consectetur autem.
                  Odit eaque sit laboriosam porro aliquam rem debitis, quae eos adipisci iure praesentium distinctio labore consequuntur similique error natus alias sed illum! Odit veniam ducimus, nemo voluptatem doloribus aut dolor.
                  Rem, a corporis similique numquam id suscipit hic nam illo praesentium. Non cumque enim excepturi unde beatae tenetur maxime ex, omnis accusamus est maiores velit blanditiis quia atque animi itaque!
                  Dolorum repellendus veniam illo incidunt optio. Ut natus at nisi non voluptates omnis officiis est consequatur assumenda officia. Nisi laudantium esse deserunt expedita explicabo reiciendis adipisci ab tenetur quam rem?
                  Alias molestias saepe expedita enim explicabo beatae, fugit delectus. Architecto enim quaerat blanditiis quis inventore qui asperiores dolorum rerum mollitia nam, a sit, vitae voluptates aliquam provident, temporibus unde maiores.
                  Accusamus ducimus sunt, aliquid quisquam tempora nemo earum? Eum, eaque. Vero enim quas sapiente mollitia amet atque accusantium veniam minima numquam alias, reprehenderit cupiditate, deleniti praesentium voluptatibus eligendi repellendus vel!
                  Quam totam sed nobis dolor culpa quas repellendus animi, error rerum veritatis, ratione excepturi quos perferendis quasi voluptatibus accusamus placeat provident. Itaque culpa vitae dolorum ad fuga architecto quos vero.
                  Commodi doloribus tempora modi eveniet, suscipit, magni quidem consequatur delectus dolor architecto dolores fuga amet omnis officiis tempore! Animi repellat atque laboriosam quae labore facilis quisquam laudantium impedit, neque repellendus?
                  Ut quo dolores consequuntur, fugiat nam, praesentium tempore hic saepe aut voluptatem dolorem consectetur, asperiores tempora eligendi repudiandae voluptas odit et corporis quas impedit atque provident ipsum obcaecati blanditiis! Laudantium!
                  Reiciendis molestiae culpa odio sit quas, ipsum, ab dolorem, minus obcaecati consequuntur exercitationem. Reiciendis vitae sapiente nemo mollitia rerum blanditiis illo, asperiores molestiae libero non alias quisquam aliquam tenetur quia.
                  Saepe eaque doloribus, tenetur voluptatibus eligendi aspernatur, voluptatum fuga iste praesentium aliquid quia. Quibusdam consequuntur velit inventore obcaecati laboriosam pariatur sed beatae sint tenetur ab, nostrum est maiores ullam enim.
                  Nisi quod, aliquid dicta numquam laborum animi dignissimos earum molestiae illo tempore id consectetur amet explicabo fugiat, quaerat atque assumenda eius temporibus quo. Sit mollitia quod eveniet. Repellat, ducimus quisquam!
                  Quos, excepturi. Aperiam, sit ad illo modi inventore distinctio architecto labore hic accusamus voluptates odit sapiente nulla illum ipsa aut culpa debitis possimus ea quibusdam nesciunt molestias reiciendis numquam doloremque.
                  Rerum quae quo maiores qui quisquam doloremque, neque placeat modi corporis ea soluta incidunt alias eum nemo eveniet non illo. Repellendus nihil delectus magni ratione. Hic natus deserunt corporis itaque!
                  Quaerat nobis facilis maxime amet incidunt atque eos esse ad perspiciatis, quasi delectus inventore in, quod, ullam quia natus porro. Maxime culpa atque neque obcaecati ullam totam error, qui quod.
                  Quo rem fuga cum magnam molestias. Doloremque dolore iure veniam laudantium quos. Pariatur culpa ab doloribus debitis, aliquam nam sint, quisquam quos molestiae totam tempore velit praesentium qui, maiores fuga?
                  Repellat rerum tenetur nesciunt eum provident odio, nihil consequatur corporis rem ex enim magnam iure blanditiis inventore quasi accusamus totam molestiae odit similique quod maxime voluptas error! Nisi, esse commodi.
                  Molestiae ullam perspiciatis qui laboriosam natus, iure tempora esse, quam totam assumenda rem voluptate soluta doloremque explicabo. Unde sit officia atque, ipsum mollitia dolore libero iusto aspernatur temporibus nam labore!
                  Ipsam quasi corrupti enim expedita magni. Eaque amet sunt cum nobis dolor maxime quos ad nulla tempore illum, sint accusantium fuga quia at quae fugiat corrupti expedita obcaecati praesentium harum?
                  Perspiciatis deleniti cumque error expedita facilis veniam aliquam eos placeat consectetur quos officia cupiditate tempora dolorem molestiae ipsam, recusandae illo saepe, quia doloremque fugiat dolorum iure sed sunt? Molestiae, amet.
                  Eius facilis nostrum reiciendis quibusdam quos, magni aliquid numquam, illum, ratione qui ea repellat. Aliquid blanditiis provident delectus alias aperiam rem nobis sed! Excepturi minus sunt asperiores? Blanditiis, veniam ab?
                  Iure consequatur perferendis soluta quo animi eveniet in eaque ab laudantium nobis. Amet, ea sed repellat quos rerum laboriosam! Modi nemo corporis asperiores accusamus a voluptatibus amet assumenda at quam.
                  Vel voluptatem recusandae, rerum repudiandae magni reiciendis eaque consequatur beatae possimus explicabo harum culpa, animi natus sed quidem laudantium eveniet voluptatum enim porro nesciunt ab voluptas voluptate delectus! Eum, perferendis?
                  Dolor, placeat incidunt. Esse aperiam eos modi facere quasi. Corrupti saepe esse ducimus molestiae assumenda, natus labore distinctio, maxime magnam laboriosam magni? Fugit doloremque sed, voluptatem libero eos architecto dolorem!
                  Natus adipisci, ea fugiat beatae odio enim illum distinctio, sed velit, dicta tempore totam dolorem ad iure! Ipsum nam sunt quod sint inventore amet, cumque deleniti odio. Inventore, laudantium itaque!
                  Eum mollitia, odio dolore assumenda nostrum eligendi ut quos cumque nisi laudantium tempore itaque nobis. Dolorem unde magnam temporibus cumque est, explicabo obcaecati, cupiditate at accusamus aliquam culpa quas fugit.
                  Dolorum alias magnam at recusandae esse dolores eos doloremque in, corrupti sapiente hic est quam reprehenderit rerum officia architecto dicta soluta cumque fugiat repellendus ratione? Accusamus asperiores culpa cum corporis!
                  Officia iste odit pariatur quis, doloremque sequi dolore voluptatem? Recusandae quaerat ab deleniti optio eum in commodi repellat vitae temporibus explicabo dolor, saepe, ut officia iusto praesentium? Maxime, minus iusto.
                  Consequuntur commodi fuga reiciendis laborum! Eveniet, odit hic inventore aliquam qui aspernatur rem nobis accusantium similique laboriosam, minus cupiditate asperiores laudantium nesciunt quo nihil provident harum enim corrupti numquam nam!
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium perferendis, inventore molestiae quam in commodi amet unde omnis qui facilis cupiditate eaque sequi libero consequatur, fugit, minima illum molestias error?
                  Asperiores rem necessitatibus facere laudantium, non maxime? Dolor commodi totam doloremque numquam iusto possimus nulla voluptatum cupiditate aliquam quidem eius, voluptas ipsam unde! Doloremque voluptate soluta praesentium ullam est laudantium?
                  Architecto consequatur nesciunt quidem quisquam, impedit commodi, ad inventore animi libero distinctio porro officiis doloribus quis atque qui incidunt at error nulla sint rerum debitis. Recusandae iste architecto laboriosam quod?
                  Dolore eaque deserunt id eius ipsa facere ex sunt quos incidunt ea vero quo molestias quod, vel, ipsam rem. Illum, debitis maiores vero dolorem voluptatibus cumque eveniet nisi illo similique.
                  Vitae quod sunt animi alias tempore veritatis recusandae mollitia vero consequatur deserunt nemo dignissimos eos aliquam molestias inventore, hic suscipit a dicta consequuntur officiis? Eum necessitatibus ad asperiores dolor ipsam.
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Champ de message fixe en bas */}
            <div className="sticky bottom-0  p-4">
              <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full p-4 pr-12 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 disabled:text-gray-400"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-md mx-auto">
              <h1 className="text-3xl font-bold mb-4">SEO CONTENT GENERATOR</h1>
              <p className="text-gray-600 mb-8">Please enter your topic</p>
              
              <div className="space-y-4">
              <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="max-w-3xl mx-auto relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full p-4 pr-12 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 disabled:text-gray-400"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}