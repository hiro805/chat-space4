class Api::MessagesController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json { @messages = Message.includes(:user).where("id > ?", params[:id])}
    end
  end
end