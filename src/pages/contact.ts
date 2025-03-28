import { html } from 'hono/html';

export const contactPage = () => {
  return html`
    <div class="contact-page">
      <h2>お問い合わせ</h2>
      <p>
        ご質問やご意見がございましたら、以下のフォームからお気軽にお問い合わせください。
      </p>
      
      <form class="contact-form">
        <div class="form-group">
          <label for="name">お名前</label>
          <input type="text" id="name" name="name" required />
        </div>
        
        <div class="form-group">
          <label for="email">メールアドレス</label>
          <input type="email" id="email" name="email" required />
        </div>
        
        <div class="form-group">
          <label for="subject">件名</label>
          <input type="text" id="subject" name="subject" required />
        </div>
        
        <div class="form-group">
          <label for="message">メッセージ</label>
          <textarea id="message" name="message" rows="6" required></textarea>
        </div>
        
        <button type="submit" class="submit-btn">送信する</button>
      </form>
      
      <div class="contact-info">
        <h3>その他の連絡先</h3>
        <p>
          <strong>メール:</strong> info@example.com<br />
          <strong>電話:</strong> 03-1234-5678<br />
          <strong>営業時間:</strong> 平日 9:00 - 17:00
        </p>
      </div>
    </div>
  `;
};
