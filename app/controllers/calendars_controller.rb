class CalendarsController < ApplicationController
  # GET /calendars
  # GET /calendars.xml
  def index
    @calendars = Calendar.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @calendars }
    end
  end

  # GET /calendars/1
  # GET /calendars/1.xml
  def show
    @calendar = Calendar.find(params[:id], :order => '"calendars.when"')

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @calendar }
    end
  end

  # GET /calendars/new
  # GET /calendars/new.xml
  def new
    @calendar = Calendar.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @calendar }
    end
  end

  # GET /calendars/1/edit
  def edit
    @calendar = Calendar.find(params[:id])

  end

  def create
    logger.debug 'Inside create....................................................'
    logger.debug '..............'
    eventStr =  params['calendar']['event']
    logger.debug eventStr
    logger.debug '..............'
    if eventStr
      @calendar  = current_user.calendars.build(:event=>eventStr, :where=>'New York', :when => Time.now+(60*60*24))
      if @calendar
        if @calendar.save
          flash[:success] = "Calendar created!"
          redirect_to root_path
        else
        @feed_items = []
          #render 'pages/home'
          redirect_to root_path
        end
      end
    end
  end

 def destroy
    logger.debug 'Inside delete method'
    @calendar = Calendar.find(params[:id])
    @calendar.destroy

    respond_to do |format|
      format.html { redirect_to root_path }
      format.js
    end
    #        render 'pages/home'


    #redirect_back_or root_path
  end

  # PUT /calendars/1
  # PUT /calendars/1.xml
  def update
    @calendar = Calendar.find(params[:id])

   respond_to do |format|
     if @calendar.update_attributes(params[:calendar])
      #format.html { redirect_to(@calendar, :notice => 'Calendar was successfully updated.') }
      format.html {
        flash[:success] = "Calendar created!"
        redirect_to root_path
      }
      format.js
      format.xml  { head :ok }
     else
      format.html { render :action => "edit" }
      format.xml  { render :xml => @calendar.errors, :status => :unprocessable_entity }
     end
   end
 end


end

