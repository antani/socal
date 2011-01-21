module CalendarsHelper
  
  def get_categories(cal_id)
    logger.debug "get_categories................"
    cc = CalendarCategory.where(:calendar_id => cal_id) #find the categories for this cal
    if cc
        cc_id = Array.new
        
        cc.each do |c|
          logger.debug ".."
          logger.debug c.category_id
          cc_id << c.category_id  
        end
        
        logger.debug cc_id
        cats = Category.where(:id => cc_id)
#        cat_array = cats.map do |mix_code|
#          "<span>#{mix_code.name}</span>"
#        end
#        catmix= cat_array.join(",")
#        return %Q(cat_mix)
         return cats
    end
  end
end
