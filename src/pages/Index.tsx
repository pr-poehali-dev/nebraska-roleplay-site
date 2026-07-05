import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const SUPPORT_URL = 'https://functions.poehali.dev/4996c61d-5098-4c39-a182-c240730dff94';

const HERO_BG = 'https://cdn.poehali.dev/projects/4765bfc0-61a0-4e67-ad63-ff9e49f9d9b5/bucket/df80032b-75e6-4640-957b-a22532da8f7c.jpg';

const NAV = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'shop', label: 'Донат', icon: 'ShoppingCart' },
  { id: 'forum', label: 'Форум', icon: 'MessagesSquare' },
  { id: 'contacts', label: 'Контакты', icon: 'LifeBuoy' },
];

const DONATE = [
  { name: 'SILVER', price: '199 ₽', color: 'from-slate-400 to-slate-600', perks: ['+2 слота гаража', 'Значок в чате', 'Приоритет входа'], popular: false },
  { name: 'GOLD', price: '499 ₽', color: 'from-amber-400 to-yellow-500', perks: ['+5 слотов гаража', 'Цветной ник', 'VIP-транспорт', 'Двойной опыт'], popular: true },
  { name: 'PLATINUM', price: '999 ₽', color: 'from-sky-400 to-blue-600', perks: ['Всё из GOLD', 'Личный особняк', 'Уникальный скин', 'Без рекламы'], popular: false },
];

const FORUM = [
  { title: 'Новости и обновления сервера', author: 'Администрация', replies: 342, tag: 'Важное', hot: true },
  { title: 'Гайд для новичков: как начать играть', author: 'Helper_Max', replies: 128, tag: 'Гайды', hot: false },
  { title: 'Ищу семью / банду для RP', author: 'Tony_Blue', replies: 89, tag: 'Поиск', hot: true },
  { title: 'Предложения по улучшению сервера', author: 'Community', replies: 205, tag: 'Идеи', hot: false },
];

const STATS = [
  { value: '1 248', label: 'Онлайн сейчас', icon: 'Users' },
  { value: '52 400', label: 'Игроков всего', icon: 'UserPlus' },
  { value: '99.9%', label: 'Аптайм сервера', icon: 'Activity' },
  { value: '24/7', label: 'Работаем', icon: 'Clock' },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const submitSupport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || !message.trim()) {
      toast({ title: 'Заполните оба поля', description: 'Укажите ник и текст обращения' });
      return;
    }
    setSending(true);
    try {
      const res = await fetch(SUPPORT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, message }),
      });
      if (!res.ok) throw new Error();
      toast({ title: 'Обращение отправлено!', description: 'Команда поддержки свяжется с тобой в ближайшее время.' });
      setNickname('');
      setMessage('');
    } catch {
      toast({ title: 'Не удалось отправить', description: 'Попробуй ещё раз чуть позже.', variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 glass">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2 font-display font-bold text-xl tracking-wider">
            <span className="grid place-items-center w-9 h-9 rounded-lg bg-primary glow-blue">
              <Icon name="Gamepad2" size={20} className="text-white" />
            </span>
            <span>NEBRASKA <span className="text-accent">RP</span></span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                {n.label}
              </button>
            ))}
            <Button onClick={() => scrollTo('shop')} className="ml-2 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
              <Icon name="Zap" size={16} /> Играть
            </Button>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
            <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
        {menuOpen && (
          <nav className="md:hidden border-t border-border animate-fade-up">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)}
                className="flex items-center gap-3 w-full px-6 py-3 text-left hover:bg-secondary">
                <Icon name={n.icon} size={18} className="text-primary" /> {n.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
          <div className="absolute inset-0 grid-pattern opacity-60" />
        </div>

        <div className="container relative z-10 py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium mb-6 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" /> Сервер онлайн · 1248 игроков
            </span>
            <h1 className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              NEBRASKA<br />
              <span className="text-gradient-blue">ROLE PLAY</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Погрузись в живой мир SAMP-сервера. Своя история, работа, бизнес и тысячи реальных игроков рядом с тобой.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" onClick={() => scrollTo('shop')} className="bg-primary hover:bg-primary/90 text-white font-semibold text-base h-13 px-8 glow-blue">
                <Icon name="Play" size={18} /> Начать игру
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('forum')} className="border-border bg-secondary/40 hover:bg-secondary text-base h-13 px-8">
                <Icon name="Users" size={18} /> Сообщество
              </Button>
            </div>

            <div className="mt-10 flex items-center gap-3 text-sm animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <code className="glass px-4 py-2 rounded-lg font-mono text-accent">samp.nebraska-rp.ru:7777</code>
              <span className="text-muted-foreground">← IP сервера</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative -mt-4 pb-20">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform">
                <Icon name={s.icon} size={26} className="text-primary mx-auto mb-3" />
                <div className="font-display font-bold text-3xl">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="py-24 relative">
        <div className="container">
          <SectionHead icon="ShoppingCart" kicker="Магазин донатов" title="Прокачай свой геймплей" />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {DONATE.map((d) => (
              <div key={d.name}
                className={`relative glass rounded-3xl p-8 flex flex-col ${d.popular ? 'ring-2 ring-accent glow-yellow scale-[1.02]' : ''}`}>
                {d.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider">
                    Хит продаж
                  </span>
                )}
                <div className={`inline-flex w-fit px-4 py-1 rounded-lg bg-gradient-to-r ${d.color} text-white font-display font-bold tracking-wider mb-4`}>
                  {d.name}
                </div>
                <div className="font-display font-bold text-4xl mb-6">{d.price}<span className="text-base text-muted-foreground font-sans font-normal"> / навсегда</span></div>
                <ul className="space-y-3 mb-8 flex-1">
                  {d.perks.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm">
                      <Icon name="Check" size={16} className="text-accent shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
                <Button className={d.popular
                  ? 'bg-accent text-accent-foreground hover:bg-accent/90 font-semibold'
                  : 'bg-primary text-white hover:bg-primary/90 font-semibold'}>
                  <Icon name="CreditCard" size={16} /> Купить
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORUM */}
      <section id="forum" className="py-24 relative bg-secondary/20">
        <div className="container">
          <SectionHead icon="MessagesSquare" kicker="Форум сообщества" title="Живое общение игроков" />
          <div className="grid lg:grid-cols-3 gap-6 mt-12">
            <div className="lg:col-span-2 space-y-3">
              {FORUM.map((t) => (
                <div key={t.title} className="glass rounded-2xl p-5 flex items-center gap-4 hover:bg-secondary/50 transition-colors cursor-pointer group">
                  <div className="grid place-items-center w-12 h-12 rounded-xl bg-primary/15 shrink-0">
                    <Icon name={t.hot ? 'Flame' : 'MessageCircle'} size={22} className={t.hot ? 'text-accent' : 'text-primary'} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary font-medium">{t.tag}</span>
                      {t.hot && <span className="text-xs text-accent font-medium">🔥 Горячее</span>}
                    </div>
                    <h4 className="font-semibold mt-1 truncate group-hover:text-primary transition-colors">{t.title}</h4>
                    <p className="text-sm text-muted-foreground">от {t.author}</p>
                  </div>
                  <div className="text-center shrink-0">
                    <div className="font-display font-bold text-xl">{t.replies}</div>
                    <div className="text-xs text-muted-foreground">ответов</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass rounded-3xl p-8 flex flex-col justify-center text-center animate-float">
              <Icon name="Users" size={40} className="text-accent mx-auto mb-4" />
              <h3 className="font-display font-bold text-2xl mb-2">Присоединяйся!</h3>
              <p className="text-muted-foreground text-sm mb-6">Более 52 000 игроков уже в нашем сообществе. Задавай вопросы, делись историями и находи друзей.</p>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                <Icon name="UserPlus" size={16} /> Регистрация на форуме
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 relative">
        <div className="container">
          <SectionHead icon="LifeBuoy" kicker="Контакты и поддержка" title="Мы всегда на связи" />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: 'Send', title: 'Telegram', text: '@nebraska_rp', note: 'Новости и анонсы' },
              { icon: 'MessageSquare', title: 'Discord', text: 'discord.gg/nebraska', note: 'Голосовые каналы' },
              { icon: 'Mail', title: 'Почта поддержки', text: 'help@nebraska-rp.ru', note: 'Ответим за 24 часа' },
            ].map((c) => (
              <div key={c.title} className="glass rounded-2xl p-8 text-center hover:-translate-y-1 transition-transform">
                <div className="grid place-items-center w-14 h-14 rounded-2xl bg-primary/15 mx-auto mb-4">
                  <Icon name={c.icon} size={26} className="text-primary" />
                </div>
                <h4 className="font-display font-bold text-xl">{c.title}</h4>
                <p className="text-accent font-medium mt-1">{c.text}</p>
                <p className="text-sm text-muted-foreground mt-1">{c.note}</p>
              </div>
            ))}
          </div>

          <div className="glass rounded-3xl p-8 md:p-12 mt-6 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display font-bold text-3xl mb-3">Нужна помощь?</h3>
              <p className="text-muted-foreground">Опиши проблему в форме — команда поддержки свяжется с тобой в кратчайшие сроки. Мы помогаем 24/7 без выходных.</p>
            </div>
            <form className="space-y-3" onSubmit={submitSupport}>
              <input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Твой ник в игре" className="w-full h-12 px-4 rounded-xl bg-secondary/50 border border-border outline-none focus:border-primary transition-colors" />
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Опиши свой вопрос..." rows={3} className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border outline-none focus:border-primary transition-colors resize-none" />
              <Button type="submit" disabled={sending} className="w-full bg-primary text-white hover:bg-primary/90 font-semibold h-12">
                {sending ? <Icon name="Loader2" size={16} className="animate-spin" /> : <Icon name="SendHorizontal" size={16} />}
                {sending ? 'Отправляем...' : 'Отправить обращение'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-display font-bold text-foreground text-lg">
            <Icon name="Gamepad2" size={20} className="text-primary" /> NEBRASKA <span className="text-accent">RP</span>
          </div>
          <p>© 2026 Nebraska Role Play. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}

function SectionHead({ icon, kicker, title }: { icon: string; kicker: string; title: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-4">
        <Icon name={icon} size={16} /> {kicker}
      </span>
      <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight">{title}</h2>
    </div>
  );
}