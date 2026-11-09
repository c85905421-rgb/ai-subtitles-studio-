AI SUBTITLE STUDIO — စတင်အသုံးပြုရန်

ဒီ Project က Browser တစ်ခုတည်းမဟုတ်ဘဲ Node.js Server လိုအပ်ပါတယ်။
Video upload အများဆုံးကို 2 GB သတ်မှတ်ထားပါတယ်။ Google Gemini File API မှာလည်း
ဖိုင်တစ်ဖိုင် 2 GB အထိသာ လက်ခံနိုင်ကြောင်း Google Docs တွင် ဖော်ပြထားပါတယ်။
ဒါကြောင့် 2 GB ထက်ကြီးတဲ့ဖိုင်ကို ဒီဗားရှင်းက မလက်ခံပါ။

လိုအပ်ချက်
1) Node.js 20+ ထည့်သွင်းထားရန်
2) Internet ရှိရန်
3) Google AI Studio API Key ရှိရန်
4) Server မှာ Video အရွယ်အစားထက်ပိုတဲ့ free disk space ရှိရန်

စတင်ရန်
1) ဒီ ZIP ကို Extract လုပ်ပါ။
2) Project folder ထဲက .env.example ကို .env လို့ အမည်ပြောင်းပါ။
3) .env ကိုဖွင့်ပြီး GEMINI_API_KEY= နောက်မှာ ကိုယ့် API Key ထည့်ပါ။
4) Terminal/Command Prompt ကို Project folder ထဲမှာဖွင့်ပါ။
5) npm install
6) npm start
7) Browser မှာ http://localhost:3000 ကိုဖွင့်ပါ။

Android ဖုန်းမှာ
Android Chrome တစ်ခုတည်းနဲ့ Server ကို အလိုအလျောက် မဖွင့်နိုင်ပါ။
Node.js Server ကို ဖုန်းထဲ သို့မဟုတ် အခြားကွန်ပျူတာ/Hosting ပေါ်မှာ
သီးခြား run ထားပြီးမှ Chrome ကနေ Website ကို ဖွင့်ရပါမယ်။
ဖုန်းတစ်လုံးတည်းနဲ့ လုပ်မယ်ဆိုရင် Server run နိုင်တဲ့ပတ်ဝန်းကျင် လိုအပ်ပါတယ်။

လုံခြုံရေး
- .env ထဲက API Key ကို မည်သူ့ကိုမျှ မပို့ပါနှင့်။
- ဒီ Server ကို အများသုံး Internet ပေါ် တင်မယ်ဆိုရင် Login, HTTPS, rate limit,
  storage cleanup နဲ့ user isolation ထပ်ထည့်ရပါမယ်။
- Public hosting မှာ ဒီ prototype ကို လုံခြုံရေးထပ်မလုပ်ဘဲ မတင်ပါနှင့်။

အရေးကြီးသောကန့်သတ်ချက်
- 1 GB+ upload လုပ်နိုင်ရန် Server, disk space, network နှင့် Gemini File API
  တို့အားလုံးက အဆင်ပြေရပါမယ်။
- Gemini ရဲ့ output က Video ရှည်လွန်းလျှင် မပြည့်စုံနိုင်ပါ။ ဒီ prototype က
  one-shot video-to-SRT ဖြစ်ပြီး အပိုင်းခွဲ resume, precise subtitle timeline editor,
  voice dubbing, project history တို့ မပါသေးပါ။
- AI ထုတ်ပေးတဲ့ timestamp/စာသားကို အသုံးမပြုမီ စစ်ဆေးပါ။
