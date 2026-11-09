AI SUBTITLE STUDIO — ONLINE DEPLOYMENT (RENDER)

ဒီ package က Online တင်နိုင်ဖို့ ပြင်ဆင်ထားတဲ့ Node.js + Express project ဖြစ်ပါတယ်။
Render မှာ Web Service အဖြစ် deploy လုပ်ရန် render.yaml ပါဝင်ပါတယ်။

လက်ရှိ MVP တွင် အလုပ်လုပ်ရန် ပါဝင်သည့်အရာများ
- Dark UI, video preview
- Server-side Gemini API key configuration
- Video upload (application limit ကို 2GB သတ်မှတ်ထား)
- Gemini ကို video ပို့ပြီး SRT ထုတ်ရန်
- SRT ကို textarea ထဲမှာ ပြင်ဆင်ခြင်း၊ copy/download လုပ်ခြင်း

မပါသေးသောအရာများ
- True chunk-by-chunk translation + resume
- User accounts / multi-user isolation
- Project history database / cloud auto-save
- Advanced subtitle styling/timeline editor
- Myanmar voice dubbing/TTS
ဒီအရာတွေကို အလုပ်လုပ်တယ်လို့ မယူဆပါနှင့်။ နောက်ထပ် development လိုပါတယ်။

ONLINE DEPLOYMENT
1. ZIP ကို Extract လုပ်ပါ.
2. Project folder (package.json, server.js, render.yaml, public folder) ကို GitHub repository အသိုက်အဝန်းမဟုတ်ဘဲ ကိုယ်ပိုင် private repository အဖြစ် upload လုပ်ပါ။
3. Render account ဝင်ပြီး New > Blueprint ကိုရွေးကာ repository ကိုချိတ်ပါ။ render.yaml ကိုဖတ်ပြီး service ဖန်တီးပါ။
4. Render Environment မှာ GEMINI_API_KEY ကို ကိုယ့် Google AI Studio key နဲ့ ထည့်ပါ။ Key ကို GitHub ထဲ မတင်ပါနှင့်။
5. Render deploy ပြီးသွားလျှင် Render ပေးတဲ့ https://....onrender.com link ကို Chrome မှာဖွင့်ပါ။

Google AI Studio API Key:
https://aistudio.google.com/app/apikey

အရေးကြီးသော Hosting / Cost / Size သတိပြုရန်
- render.yaml မှာ Starter paid web service နဲ့ 10GB persistent disk ကို သတ်မှတ်ထားပါတယ်။ Render Free service တွင် persistent disk မရနိုင်ပါ။ Render Free filesystem သည် ephemeral ဖြစ်ပြီး service sleep/restart/redeploy လုပ်သည့်အခါ upload များ ပျောက်နိုင်သည်။
- Hosting provider ရဲ့ HTTP request body limit, RAM, timeout, bandwidth, disk space နဲ့ billing က 2GB upload ကို လက်ခံနိုင်မှသာ အလုပ်လုပ်ပါမယ်။ ဒီ ZIP တစ်ခုတည်းက 2GB upload ကို host တိုင်းမှာ အာမမခံနိုင်ပါ။
- Gemini Files API/model ရဲ့ file, video-duration, context, output-token, quota, rate-limit စည်းမျဉ်းများက သီးခြားသက်ဆိုင်ပါတယ်။ 2GB upload လုပ်နိုင်တာက 2GB video တစ်ခုလုံးကို ပြည့်စုံတိကျစွာ SRT ပြောင်းပေးမယ်လို့ မဆိုလိုပါ။
- ဒီ MVP က Video တစ်ခုလုံးကို request တစ်ကြိမ်တည်းနဲ့ process လုပ်ဖို့ ကြိုးစားပါတယ်။ အလွန်ရှည်တဲ့ video တွေမှာ output မပြည့်စုံခြင်း/timeout ဖြစ်နိုင်ပါတယ်။
- Gemini API အသုံးပြုမှုမှာ quota သို့မဟုတ် ကုန်ကျစရိတ် ရှိနိုင်ပါတယ်။ Billing ကို အရင်စစ်ဆေးပါ။
- Public website အဖြစ် လူအများသုံးမယ်ဆိုရင် authentication, per-user quotas, abuse protection, privacy policy, rate limiting, secure job queue, persistent project database, signed object storage စတာတွေ ထပ်ထည့်ရန်လိုပါတယ်။ ဒီ MVP ကို public multi-user service အဖြစ် မဖွင့်သေးပါနှင့်။

API KEY SECURITY
GEMINI_API_KEY ကို Render Dashboard > Service > Environment ထဲမှာသာ ထည့်ပါ။
API Key ကို HTML, JavaScript, GitHub repository, chat message တို့ထဲ မထည့်ပါနှင့်။
