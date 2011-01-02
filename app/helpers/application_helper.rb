module ApplicationHelper
  # Return a title on a per-page basis.
  def title
    base_title = "Socl"
    if @title.nil?
      base_title
    else
      "#{base_title} | #{@title}"
    end
  end

  def avatar_url(user)
    if user.avatar_url.present?
      user.avatar_url
    else
      default_url = "#{root_url}images/guest.png"
      gravatar_id = Digest::MD5.hexdigest(user.email.downcase)
      "http://gravatar.com/avatar/#{gravatar_id}.png?s=48&d=#{CGI.escape(default_url)}"
    end
  end

  #Sets default focus to a particular element in the page
  def set_focus_to_id(id)
    javascript_tag("$('#{id}').focus()");
  end

  def noise
     logger.debug "---------Trying to create noise-----------------------------"
    #Find all calendars that have 'when' = now.
    @mail_calendar = Calendar.where(:when => (Time.now+5.minutes)..(Time.now+6.minutes))
    @mail_calendar.each do |c|
      UserMailer.registration_confirmation(c.user,c).deliver
    end
  end

end

